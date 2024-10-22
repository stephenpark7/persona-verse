import { DataTypes, Model } from 'sequelize';
import { Response } from 'express';
import { Session } from 'express-session';

import type { Request } from 'express';
import {
  type UserCreateParams,
  type UserCreateResponse,
  type UserLoginParams,
  type UserLoginResponse,
} from '@shared/types';

import {
  TokenType,
  userLoginParams as userLoginParamsSchema,
  userCreateParams as userCreateParamsSchema,
  request,
} from '@shared/schemas';

import {
  validateUserCreate,
  validateUserLogin,
  generateRevokedToken,
  hashPassword,
  validatePassword,
  InternalServerError,
} from '@utils';

import { jwtFactory } from '@factories';

import { sequelize } from '../sequelize';
import { UserProfile } from './UserProfile';
import { RevokedToken } from './RevokedToken';
import { Jwt } from '@models';

export class User extends Model {
  public getId(): number {
    return parseInt(this.getDataValue('id'));
  }

  public getUsername(): string {
    return this.getDataValue('username');
  }

  public static async createAccount(
    userCreateParams: UserCreateParams,
  ): Promise<UserCreateResponse> {
    const { username, email, password } =
      userCreateParamsSchema.parse(userCreateParams);

    const error = await validateUserCreate(username, email, password);

    if (error) {
      throw new InternalServerError(error);
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (!user) {
      throw new InternalServerError();
    }

    return { message: 'User created successfully.' };
  }

  public static async loginAccount(
    userLoginParams: UserLoginParams,
    req: Request,
  ): Promise<UserLoginResponse> {
    const { username, password } = userLoginParamsSchema.parse(userLoginParams);

    const error = await validateUserLogin(username, password);

    if (error) {
      throw new InternalServerError(error);
    }

    const user = await User.findByUsername(username);

    await validatePassword(user, password);

    const userId = user.getId();

    const payload = {
      userId,
      username,
    };

    const accessToken = await jwtFactory(TokenType.AccessToken, payload, true);

    const refreshToken = await jwtFactory(
      TokenType.RefreshToken,
      payload,
      true,
    );

    req.session.refreshToken = {
      token: refreshToken.toString(),
    };

    const profile = await UserProfile.findOrCreateForUser(userId, username);

    return {
      message: 'Logged in successfully.',
      jwt: accessToken.value(),
      profile,
    };
  }

  public static async logoutAccount(
    session: Session,
    req: Request,
    res: Response,
  ) {
    req = request.parse(req);

    const refreshToken = req.session.refreshToken;

    const { jti, userId } = await Jwt.decode(refreshToken.token);

    await revokeTokenIfNotRevoked(jti, userId);

    await destroySession(session);

    res.clearCookie('pv-session', { path: '/' });

    return { message: 'Logged out successfully.' };
  }

  public static async findById(id: number) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new InternalServerError('User not found.');
    }

    return user;
  }

  public static async findByUsername(username: string) {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new InternalServerError('User not found.');
    }

    return user;
  }
}

// TODO: refactor by moving to Jwt class

const revokeTokenIfNotRevoked = async (jti: string, userId: number) => {
  const revokedToken = await RevokedToken.findByPk(jti);
  if (!revokedToken) {
    await generateRevokedToken(userId);
  }
};

// TODO: refactor by moving to Session class

const destroySession = (session: Session): Promise<void> => {
  return new Promise((resolve, reject) => {
    session.destroy((err: Error) => {
      if (err) {
        console.error('Error while destroying session: ', err);
        reject(new Error('Error while logging out.'));
      } else {
        resolve();
      }
    });
  });
};

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  },
);
