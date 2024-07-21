import { ModelDefinitions } from 'src/interfaces';
import { sequelize } from './sequelize';
import Models from '../models';

const db = () => {
  const models: ModelDefinitions = {
    User: Models.User.initModel(sequelize),
    Tweet: Models.Tweet.initModel(sequelize),
    RevokedToken: Models.RevokedToken.initModel(sequelize),
    RefreshToken: Models.RefreshToken.initModel(sequelize),
  }

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

  return {
    sequelize,
    setupDB,
    models,
  };
};

export default db();
