const db = require('../models');
const Tweet = db.Tweet;

// Create tweet
exports.create = async (req, res) => {
  const { message } = req.body;
console.log(message);
  if (message.length === 0) return;

  // Save tweet to database
  try {
    const tweet = await Tweet.create({
      UserId: req.userId,
      message: message,
      likes: 0
    });
    res.status(200).json({ data: tweet })
  } catch {
    res.status(200).json({ error: 'Error creating tweet.' });
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
    res.status(200).json({ data: tweets });
  } catch {
    res.status(200).json({ error: 'Error getting tweets.' })
  }
}
