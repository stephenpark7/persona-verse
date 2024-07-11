import dotenv from 'dotenv';
dotenv.config();

import { DataTypes, Sequelize, Options } from 'sequelize';
import Tweet from './tweet.model';
import User from './user.model';

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

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
});

Tweet.init({
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Tweet',
});

User.hasMany(Tweet);
Tweet.belongsTo(User);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  }
  catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

sequelize.sync();

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
