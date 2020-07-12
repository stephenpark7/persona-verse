const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    ssl: { rejectUnauthorized: false }
  }                        
});

sequelize
.authenticate()
.then(function() {
    console.log('Connection has been established successfully.');
})
.catch(function(err) {
    console.log('Unable to connect to the database:', err);
});

const User = sequelize.define('User', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

module.exports = sequelize;

// module.exports.connect = ( { database, username, password, host } ) => {
//   sequelize.sync().then(() => {
//     User.create({
//       username: 'spark',
//       email: 'spark@gmail.ca',
//       password: '123'
//     }).then(user => {
//       console.log(user);
//     }).catch(err => {
//       console.log(err);
//     });
//   });
// }


