import type { Sequelize } from 'sequelize';
import { RefreshToken } from './RefreshToken';
import { RevokedToken } from './RevokedToken';
import { Tweet } from './Tweet';
import { User } from './User';
import { UserProfile } from './UserProfile';

export const initModels = async (sequelize: Sequelize) => {
  RefreshToken.initModel(sequelize);
  RevokedToken.initModel(sequelize);
  Tweet.initModel(sequelize);
  User.initModel(sequelize);
  UserProfile.initModel(sequelize);
  await setupAssociations();
};

export const setupAssociations = async () => {
  RefreshToken.belongsTo(User);
  RevokedToken.belongsTo(User);
  Tweet.belongsTo(User);
  User.hasMany(Tweet);
  User.hasMany(RevokedToken);
  User.hasMany(RefreshToken);
  User.hasOne(UserProfile);
  UserProfile.belongsTo(User);
};
