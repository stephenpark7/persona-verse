import type { Request } from 'express';
import { extractUserIdFromRequest, extractMessageFromRequest } from '@utils';
import { Tweet } from '@db/models';

export const createTweet = async (req: Request) => {
  const userId = extractUserIdFromRequest(req);

  const message = extractMessageFromRequest(req);

  const tweet = await Tweet.create({
    UserId: userId,
    message,
    likes: 0,
  });

  return {
    message: 'Tweet posted.',
    tweet: {
      message,
      likes: 0,
      createdAt: tweet.getDataValue('createdAt'),
    },
  };
};

export const getTweets = async (req: Request) => {
  const userId = extractUserIdFromRequest(req);

  const tweets = await Tweet.findAll({
    attributes: ['message', 'likes', 'createdAt'],
    where: {
      UserId: userId,
    },
    include: {
      association: 'User',
      attributes: ['username'],
    },
    order: [['createdAt', 'DESC']],
  });

  return {
    message: 'Tweets retrieved.',
    tweets: tweets,
  };
};
