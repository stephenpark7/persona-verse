import { ModelDefinitions } from '../../src/interfaces';
import { sequelize } from './sequelize';
import { User, Tweet, RevokedToken, RefreshToken, UserProfile } from '../models';

const db = (() => {
  const models: ModelDefinitions = {
    User: User.initModel(sequelize),
    Tweet: Tweet.initModel(sequelize),
    RevokedToken: RevokedToken.initModel(sequelize),
    RefreshToken: RefreshToken.initModel(sequelize),
    UserProfile: UserProfile.initModel(sequelize),
  };

  const setupDB = async (): Promise<void> => {
    await sequelize.authenticate();

    const { User, Tweet, RevokedToken, RefreshToken, UserProfile }
      : ModelDefinitions = models;

    User.hasMany(Tweet);
    User.hasMany(RevokedToken);
    User.hasMany(RefreshToken);
    User.hasOne(UserProfile);

    Tweet.belongsTo(User);
    RevokedToken.belongsTo(User);
    RefreshToken.belongsTo(User);
    UserProfile.belongsTo(User);

    await syncDB();
  };

  const syncDB = async (): Promise<void> => {
    if (process.env.NODE_ENV === 'test') {
      await sequelize.sync({ force: true });
      return;
    }

    await sequelize.sync();
  }

  return {
    sequelize,
    setupDB,
    models,
  };
})();

export { db };
