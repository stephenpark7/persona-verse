const db = require('../models');
const Tweet = db.Tweet;

// Create tweet
exports.create = async (req, res) => {
  const { message } = req.body;

  if (message.length === 0) return;

  // Save tweet to database
  Tweet.create({
    ownerId: req.userId,
    message: message,
    likes: 0
  }).then(tweet => {
    // console.log(tweet);
    res.status(200).send('Successfully created a tweet.');
  }).catch(err => {
    res.status(400).send('Failed to create an account.');
  });
}

// Get tweets
exports.get = async (req, res) => {
  Tweet.findAll({
    attributes: ['message', 'likes'],
    where: {
      ownerId: req.userId 
    }
  }).then(tweets => {
    res.status(200).json(tweets);
  }).catch(err => {
    res.status(400).send('Failed to get tweets.');
  });
}