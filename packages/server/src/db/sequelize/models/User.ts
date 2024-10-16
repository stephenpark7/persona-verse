import type { Response } from 'express';
import type { Session } from 'express-session';
import { authenticatedRequest } from '@shared/schemas';
import type { AuthenticatedRequest } from '@shared/types';
import type {
  UserCreateParams,
  UserCreateResponse,
  UserLoginParams,
  UserLoginResponse,
} from '@types';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';
import {
  assertValidUserCreate,
  assertValidUserLogin,
  generateAccessToken,
  generateRefreshToken,
  generateRevokedToken,
  hashPassword,
  validatePassword,
  verifyToken,
  InternalServerError,
  AuthenticationError,
  isFalsy,
  isTruthy,
} from '@utils';
import { UserProfile } from './UserProfile';
import { RevokedToken } from './RevokedToken';

export class User extends Model {
  public static async createAccount({
    username,
    email,
    password,
  }: UserCreateParams): Promise<UserCreateResponse> {
    await assertValidUserCreate(username, email, password);

    const hashedPassword = await hashPassword(password);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

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

    const accessToken = generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);

    if (req.session) {
      req.session.refreshToken = refreshToken;
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
      jwt: accessToken,
      profile: profile,
    };
  }

  public static async logoutAccount(
    session: Session,
    req: AuthenticatedRequest,
    res: Response,
  ) {
    authenticatedRequest.parse(req);

    if (isFalsy(req.session)) {
      throw new InternalServerError(
        'Internal server error occurred while logging out.',
      );
    }

    const refreshToken = req.session.refreshToken;

    if (isFalsy(refreshToken)) {
      throw new AuthenticationError('Session expired. Please login again.');
    }

    if (isFalsy(refreshToken.token)) {
      throw new InternalServerError('Token not found.');
    }

    const { jti, userId } = verifyToken(refreshToken.token);

    await revokeToken(jti, userId);

    await clearSession(session);

    clearCookie(res);

    return { message: 'Logged out successfully.' };
  }
}

const revokeToken = async (jti: string, userId: number) => {
  if (isFalsy(jti) || isFalsy(userId)) {
    throw new InternalServerError('Invalid token.');
  }

  const user = await User.findByPk(userId);

  if (isFalsy(user)) {
    throw new InternalServerError('User not found.');
  }

  const revokedToken = await RevokedToken.findByPk(jti);

  if (isFalsy(revokedToken)) {
    await generateRevokedToken(userId);
  }
};

const clearSession = (session: Session): Promise<void> => {
  return new Promise((resolve, reject) => {
    session.destroy((err: Error) => {
      if (err) {
        reject(new AuthenticationError('Error while clearing session.'));
      } else {
        resolve();
      }
    });
  });
};

const clearCookie = (res: Response): void => {
  res.clearCookie('pv-session', { path: '/' });
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
