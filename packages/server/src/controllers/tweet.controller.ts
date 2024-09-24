import { db } from '@db';
import { AuthenticatedRequest, RequestBody } from '@interfaces';

const { Tweet } = db.models;

// TODO: add try catch block for error handling

export const tweetCreate = async (req: AuthenticatedRequest) => {
  const { message } = req.body[0] as RequestBody;
  const userId = req.userId;

  if (message.length === 0) {
    throw new Error('Message cannot be empty.');
  }

  if (userId === undefined || userId === null) {
    throw new Error('User not found.');
  }

  const tweet = await Tweet.create({
    UserId: userId,
    message: message,
    likes: 0,
  });

  return {
    message: 'Tweet posted.',
    tweet: {
      message: message,
      likes: 0,
      createdAt: tweet.getDataValue('createdAt'),
    },
  };
};

export const tweetGet = async (req: AuthenticatedRequest) => {
  const tweets = await Tweet.findAll({
    attributes: [ 'message', 'likes', 'createdAt' ],
    where: {
      UserId: req.userId,
    },
    include: {
      association: 'User',
      attributes: [ 'username' ],
    },
    order: [ [ 'createdAt', 'DESC' ] ],
  });

  return {
    message: 'Tweets retrieved.',
    tweets: tweets,
  };
};
