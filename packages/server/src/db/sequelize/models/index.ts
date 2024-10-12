import type { Sequelize } from 'sequelize';
import { RefreshToken } from './RefreshToken';
import { RevokedToken } from './RevokedToken';
import { Tweet } from './Tweet';
import { User } from './User';
import { UserProfile } from './UserProfile';

export const initModels = async (sequelize: Sequelize) => {
  return new Promise<void>((resolve, reject) => {
    const init = async () => {
      try {
        RefreshToken.initModel(sequelize);
        RevokedToken.initModel(sequelize);
        Tweet.initModel(sequelize);
        User.initModel(sequelize);
        UserProfile.initModel(sequelize);
        await setupAssociations();
        resolve();
      } catch (error) {
        reject(error);
      }
    };
    init();
  });
};

export const setupAssociations = async () => {
  return new Promise<void>((resolve, reject) => {
    try {
      RefreshToken.belongsTo(User);
      RevokedToken.belongsTo(User);
      Tweet.belongsTo(User);
      User.hasMany(Tweet);
      User.hasMany(RevokedToken);
      User.hasMany(RefreshToken);
      User.hasOne(UserProfile);
      UserProfile.belongsTo(User);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export * from './RefreshToken';
export * from './RevokedToken';
export * from './Tweet';
export * from './User';
export * from './UserProfile';
