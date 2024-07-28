import { ModelDefinitions } from '../../src/interfaces';
import { sequelize } from './sequelize';
import { User, Tweet, RevokedToken, RefreshToken } from '../models';

const db = () => {
  async function setupDB(): Promise<void> {
    await sequelize.authenticate();

    const {
      User,
      Tweet,
      RevokedToken,
      RefreshToken,
    }: ModelDefinitions = models;

    User.hasMany(Tweet);
    User.hasMany(RevokedToken);
    User.hasMany(RevokedToken);

    Tweet.belongsTo(User);
    RevokedToken.belongsTo(User);
    RefreshToken.belongsTo(User);

    await syncDB();
  }

  async function syncDB(): Promise<void> {
    if (process.env.NODE_ENV === 'test') {
      await sequelize.sync({ force: true });
      return;
    }

    await sequelize.sync();
  }

  const models: ModelDefinitions = {
    User: User.initModel(sequelize),
    Tweet: Tweet.initModel(sequelize),
    RevokedToken: RevokedToken.initModel(sequelize),
    RefreshToken: RefreshToken.initModel(sequelize),
  };

  return {
    sequelize,
    setupDB,
    models,
  };
};

export default db();
