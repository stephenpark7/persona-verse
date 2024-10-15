import type { UserCreateParams } from '@types';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';
import { hash, validateUserCreate } from '@utils';

export class User extends Model {
  public static async createAccount({
    username,
    email,
    password,
  }: UserCreateParams): Promise<User> {
    await validateUserCreate(username, email, password);

    const hashedPassword = await hash(password);

    return User.create({
      username,
      email,
      password: hashedPassword,
    });
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
