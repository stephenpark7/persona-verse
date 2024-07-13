import { Sequelize, Options } from 'sequelize';
import User from './user.model';
import Tweet from './tweet.model';
import RevokedToken from './revokedToken.model';

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
    idle: 10000
  },
};

const sequelize = new Sequelize(sequelizeOptions);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    User.initModel();
    Tweet.initModel();
    RevokedToken.initModel();

    User.hasMany(Tweet);
    User.hasMany(RevokedToken);
    Tweet.belongsTo(User);
    RevokedToken.belongsTo(User);

    await sequelize.sync();
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();

export {
  sequelize,
  User,
  Tweet,
  RevokedToken,
};

process.on('SIGINT', function () {
  sequelize.close();
});
