import { Sequelize, Options } from 'sequelize';
import User from './user.model';
import Tweet from './tweet.model';
import RevokedToken from './revokedToken.model';
import RefreshToken from './refreshToken.model';

const sequelizeOptions: Options = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  // sync: { force: true },
};

const sequelize = new Sequelize(sequelizeOptions);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    User.initModel();
    Tweet.initModel();
    RevokedToken.initModel();
    RefreshToken.initModel();

    User.hasMany(Tweet);
    User.hasMany(RevokedToken);
    User.hasMany(RefreshToken);
    Tweet.belongsTo(User);
    RevokedToken.belongsTo(User);
    RefreshToken.belongsTo(User);

    await sequelize.sync();
  } catch (error: unknown) {
    console.error('Error occurred:', error);
  }
})();

export {
  sequelize,
  User,
  Tweet,
  RevokedToken,
  RefreshToken,
};

process.on('SIGINT', function () {
  sequelize.close();
});
