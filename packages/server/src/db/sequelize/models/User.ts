import type { UserCreateParams, UserCreateResponse } from '@types';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';
import { assertValidUserCreate, hashPassword } from '@utils';

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

  // TODO: move validation here
  // const validateLogin(..)
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
