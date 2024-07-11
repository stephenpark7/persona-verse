import { Sequelize, Options } from 'sequelize';
import User from './user.model';
import Tweet from './tweet.model';

const sequelizeOptions: Options = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  // sync: { force: true }
};

const sequelize = new Sequelize(sequelizeOptions);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    User.initModel();
    Tweet.initModel();

    User.hasMany(Tweet);
    Tweet.belongsTo(User);

    await sequelize.sync();
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();

export {
  sequelize,
  User,
  Tweet,
};

// db.User = require("./user.model")(sequelize, Sequelize);
// db.Tweet = require("./tweet.model")(sequelize, Sequelize);
// db.User.hasMany(db.Tweet);
// db.Tweet.belongsTo(db.User);

process.on('SIGINT', function () {
  sequelize.close();
});
