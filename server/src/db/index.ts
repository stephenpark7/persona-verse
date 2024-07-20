import { Sequelize, Options, Model, ModelStatic } from 'sequelize';
import Models from '../models';

const sequelizeOptions: Options = {
  database: `${process.env.DB_NAME}_${process.env.NODE_ENV}`,
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
  // logging: false,
};

const sequelize = new Sequelize(sequelizeOptions);

type UserModel = ModelStatic<Model>;

let User: UserModel;
let Tweet: UserModel;
let RevokedToken: UserModel;
let RefreshToken: UserModel;

// if (process.env.NODE_ENV === 'development') {
//   (async () => {
//     await setupDB();
//   })();
// }

async function setupDB() {
  try {
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

    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync();
    }
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

// process.on('SIGINT', function () {
//   sequelize.close();
// });
