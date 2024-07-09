module.exports = (sequelize, Sequelize) => {
  const Tweet = sequelize.define('Tweet', {
    message: Sequelize.STRING,
    likes: Sequelize.INTEGER
  });
  
  return Tweet;
}
