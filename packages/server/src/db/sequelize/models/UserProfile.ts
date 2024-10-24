import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export class UserProfile extends Model {
  public static async findOrCreateForUser(
    userId: number,
    username: string,
  ): Promise<UserProfile> {
    const [userProfile] = await UserProfile.findOrCreate({
      where: { UserId: userId },
      defaults: {
        displayName: username,
      },
      attributes: ['displayName', 'picture', 'bio'],
    });

    if (!userProfile) {
      throw new Error('Failed to find or create user profile.');
    }

    return userProfile;
  }
}

UserProfile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'UserProfile',
  },
);
