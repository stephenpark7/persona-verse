const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  // sync: { force: true }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, Sequelize);
db.Tweet = require("./tweet.model")(sequelize, Sequelize);
db.User.hasMany(db.Tweet);
db.Tweet.belongsTo(db.User);

module.exports = db;

process.on('SIGINT', function () {
  sequelize.close();
});
