module.exports = (sequelize, Sequelize) => {
  const Tweet = sequelize.define('Tweet', {
    ownerId: Sequelize.INTEGER,
    message: Sequelize.STRING,
    likes: Sequelize.INTEGER
  });
  
  return Tweet;
}