import type {
  AuthenticatedRequest,
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
  hashPassword,
  validatePassword,
} from '@utils';
import { UserProfile } from './UserProfile';

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
}

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
