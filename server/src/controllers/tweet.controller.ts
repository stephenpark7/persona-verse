import { Response } from 'express';
import { AuthenticatedRequest, RequestBody } from '../interfaces';
import { db } from '../db';

const { Tweet } = db.models;

const create = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { message } = req.body as RequestBody;
    const userId = req.userId;

    if (message.length === 0) {
      return res.status(400).json({ requestBodyMessage: 'Message cannot be empty.' });
    }

    const tweet = await Tweet.create({
      UserId: userId,
      message: message,
      likes: 0,
    });

    res.status(200).json({ 
      message: 'Tweet posted.',
      tweet: {
        message: message,
        likes: 0,
        createdAt: tweet.getDataValue('createdAt'),
      },
    });
  } catch (error: unknown) {
    res.status(500).json({ message: 'Error posting tweet.' })
  }
};

const get = async (req: AuthenticatedRequest, res: Response) => {
  try {
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
    
    res.status(200).json({ 
      message: 'Tweets retrieved.',
      tweets: tweets,
    });
  } catch (error: unknown) {
    res.status(500).json({ message: 'Error getting tweets.' });
  }
};

export { create, get };
