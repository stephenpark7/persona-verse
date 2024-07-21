import {
  sequelize,
} from './sequelize';
import Models from '../models';
import { ModelDefinitions } from '../interfaces';

// TODO: refactor this file
// and sequelize.ts

let { User, Tweet, RevokedToken, RefreshToken } = {} as ModelDefinitions;

async function setupDB(): Promise<void> {
  await sequelize.authenticate();

  User = Models.User(sequelize);
  Tweet = Models.Tweet(sequelize);
  RevokedToken = Models.RevokedToken(sequelize);
  RefreshToken = Models.RefreshToken(sequelize);

  User.hasMany(Tweet);
  User.hasMany(RevokedToken);
  User.hasMany(RevokedToken);

  Tweet.belongsTo(User);

  RevokedToken.belongsTo(User);
  RefreshToken.belongsTo(User);

  if (process.env.NODE_ENV === 'test') {
    await sequelize.sync({ force: true });
    return;
  }
  
  await sequelize.sync();
}

export {
  sequelize,
  setupDB,
  User,
  Tweet,
  RevokedToken,
  RefreshToken,
};
