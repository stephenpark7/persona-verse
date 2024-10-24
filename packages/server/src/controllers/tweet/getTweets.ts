import type { Request } from 'express';
import { extractUserIdFromRequest } from '@utils';
import { Tweet } from '@db/models';

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
