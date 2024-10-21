import type { AuthenticatedRequest } from '@shared/types';
import type { Response } from 'express';
import {
  type UserCreateParams,
  type UserCreateResponse,
  type UserLoginParams,
  type UserLoginResponse,
} from '@shared/types';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';
import {
  assertValidUserCreate,
  assertValidUserLogin,
  generateRevokedToken,
  hashPassword,
  validatePassword,
  verifyToken,
  InternalServerError,
  AuthenticationError,
} from '@utils';
import { UserProfile } from './UserProfile';
import { RevokedToken } from './RevokedToken';
import { Session } from 'express-session';
import { authenticatedRequest } from '@shared/schemas';
import { TRPCError } from '@trpc/server';
import { AccessToken, RefreshToken } from '@models';

// TODO: refactor

export class User extends Model {
  public static async createAccount({
    username,
    email,
    password,
  }: UserCreateParams): Promise<UserCreateResponse> {
    await assertValidUserCreate(username, email, password);

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (!user) {
      throw new InternalServerError('Internal server error occurred.');
    }

    return { message: 'User created successfully.' };
  }

  public static async loginAccount(
    { username, password }: UserLoginParams,
    req: AuthenticatedRequest,
  ): Promise<UserLoginResponse> {
    await assertValidUserLogin(username, password);

    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new Error('Invalid credentials.');
    }

    await validatePassword(password, user);

    const payload = {
      userId: parseInt(user.getDataValue('id')),
      username,
    };

    const accessToken = new AccessToken(payload);

    const refreshToken = new RefreshToken(payload);

    if (req.session) {
      req.session.refreshToken = {
        token: refreshToken.toString(),
      };
    } else {
      throw new Error('Internal server error occurred while logging in.');
    }

    const [profile] = await UserProfile.findOrCreate({
      where: { UserId: payload.userId },
      defaults: {
        displayName: username,
      },
      attributes: ['displayName', 'picture', 'bio'],
    });

    if (!profile) {
      throw new Error('Internal server error occurred while logging in.');
    }

    return {
      message: 'Logged in successfully.',
      jwt: accessToken.value(),
      profile: profile,
    };
  }

  public static async logoutAccount(
    session: Session,
    req: AuthenticatedRequest,
    res: Response,
  ) {
    authenticatedRequest.parse(req);

    if (!req.session) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error occurred.',
        cause: new AuthenticationError('Session not found.'),
      });
    }

    const refreshToken = req.session.refreshToken;

    if (!refreshToken) {
      throw new AuthenticationError('Session expired. Please login again.');
    }

    if (!refreshToken.token) {
      throw new InternalServerError('Token not found.');
    }

    const { jti, userId } = verifyToken(refreshToken.token);

    if (jti == null || userId == null) {
      throw new InternalServerError('Invalid token.');
    }

    const user = await User.findByPk(userId);
    if (user) {
      await revokeTokenIfNotRevoked(jti, userId);
    }

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
}

const revokeTokenIfNotRevoked = async (jti: string, userId: number) => {
  const revokedToken = await RevokedToken.findByPk(jti);
  if (!revokedToken) {
    await generateRevokedToken(userId);
  }
};

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
