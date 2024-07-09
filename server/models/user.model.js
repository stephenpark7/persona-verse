module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    username: Sequelize.STRING,
    displayName: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
  });
  
  return User;
}
