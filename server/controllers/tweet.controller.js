const db = require('../models');
const Tweet = db.Tweet;

// Create tweet
exports.create = async (req, res) => {
  const { message } = req.body;

  if (message.length === 0) return;

  // Save tweet to database
  try {
    const tweet = await Tweet.create({
      UserId: req.userId,
      message: message,
      likes: 0
    });
    res.status(200).send(tweet);
  } catch {
    res.status(400).send('Failed to create a tweet.');
  }
}

// Get tweets
exports.get = async (req, res) => {
  try {
    const tweets = await Tweet.findAll({
      attributes: {
        include: ['message', 'likes'],
      },
      where: {
        UserId: req.userId,
      },
      include: {
        model: db.User,
        attributes: ['username', 'displayName'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(tweets);
  } catch {
    res.status(400).send('Failed to get tweets.');
  }
}
