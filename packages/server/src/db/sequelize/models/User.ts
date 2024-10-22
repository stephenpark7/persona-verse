import { DataTypes, Model } from 'sequelize';
import type { Request, Response } from 'express';
import type { Session } from 'express-session';

import type {
  UserCreateParams,
  UserCreateResponse,
  UserLoginParams,
  UserLoginResponse,
} from '@shared/types';

import {
  TokenType,
  userLoginParams as userLoginParamsSchema,
  userCreateParams as userCreateParamsSchema,
  request,
} from '@shared/schemas';

import {
  hashPassword,
  InternalServerError,
  logger,
  validatePassword,
  validateUserCreate,
  validateUserLogin,
} from '@utils';

import { jwtFactory } from '@factories';

import { Jwt } from '@models';

import { sequelize } from '../sequelize';

import { UserProfile } from './UserProfile';
import { assertIsError } from '@shared/utils';

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

    const accessToken = await jwtFactory(TokenType.AccessToken, payload);

    const refreshToken = await jwtFactory(TokenType.RefreshToken, payload);

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

    logger.info(req.session);

    try {
      const { jti, userId } = await Jwt.decode(refreshToken.token);
      await Jwt.revokeToken(jti, userId);
      await destroySession(session);
    } catch (err) {
      assertIsError(err);
      logger.error(err);
      // If an error occurs while:
      // -- 1) decoding the token,
      // -- 2) revoking the token
      // -- 3) destroying the session
      // We should catch the error
      // And log it, but still continue with the logout process
      // This is to ensure that the user is logged out on the client side even if an error occurs on the server side
    }

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
