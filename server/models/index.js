const Sequelize = require('sequelize');

let sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
      ssl: { rejectUnauthorized: false }
  },
  // logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, Sequelize);

module.exports = db;

// sequelize
// .authenticate()
// .then(function() {
//     console.log('Connection has been established successfully.');
//     resolve();
// })
// .catch(function(err) {
//     console.log('Unable to connect to the database:', err);
// });

// module.exports.initialize = () => {
//   return new Promise((resolve, reject) => {

//   });
// }