import { sequelize } from './sequelize';
import { User, Tweet, RevokedToken, RefreshToken, UserProfile } from '@models';

const setupAssociations = (): void => {
  User.hasMany(Tweet);
  User.hasMany(RevokedToken);
  User.hasMany(RefreshToken);
  User.hasOne(UserProfile);

  Tweet.belongsTo(User);
  RevokedToken.belongsTo(User);
  RefreshToken.belongsTo(User);
  UserProfile.belongsTo(User);
};

const syncDatabase = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'test') {
    await sequelize.sync({ force: true });
    return;
  }

  await sequelize.sync();
};

export const setupDatabase = async (): Promise<void> => {
  await sequelize.authenticate();

  setupAssociations();

  await syncDatabase();
};
