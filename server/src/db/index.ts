import { Sequelize, Options, Model, ModelStatic } from 'sequelize';
import Models from '../models';

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

type UserModel = ModelStatic<Model>;

var User: UserModel;
var Tweet: UserModel;
var RevokedToken: UserModel;
var RefreshToken: UserModel;

(async () => {
  await setupDB(sequelize)
})();

async function setupDB(sequelize: Sequelize) {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

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

    await sequelize.sync();
  } catch (error: unknown) {
    console.error('Error occurred:', error);
  }
}

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
