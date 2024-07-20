import { sequelize, sequelizeOptions } from './sequelize';
import { ModelData } from '../interfaces';
import Models from '../models';

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

let User: ModelData;
let Tweet: ModelData;
let RevokedToken: ModelData;
let RefreshToken: ModelData;

export {
  sequelize,
  sequelizeOptions,
  setupDB,
  User,
  Tweet,
  RevokedToken,
  RefreshToken,
};

process.on('SIGINT', function () {
  sequelize.close();
});
