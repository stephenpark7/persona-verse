import { Response } from 'express';
import { AuthenticatedRequest, CreateRequestBody } from '../interfaces';
import { Tweet } from '../models';

export const create = async (req: AuthenticatedRequest, res: Response) => {
  const requestBody: CreateRequestBody = req.body;
  const message: string = requestBody?.message ?? '';
  const userId = req.userId;

  if (message.length === 0) {
    return res.status(400).json({ error: 'Message cannot be empty.' });
  }

  try {
    const tweet = await Tweet.create({
      UserId: userId,
      message: message,
      likes: 0,
    });
    res.status(200).json({ data: {
      message: tweet.getDataValue('message'),
      likes: tweet.getDataValue('likes'),
      createdAt: tweet.getDataValue('createdAt'),
    } });
  } catch (error) {
    res.status(500).json({ error: 'Error posting tweet.' });
  }
};

export const get = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const tweets = await Tweet.findAll({
      attributes: ['message', 'likes', 'createdAt'],
      where: {
        UserId: req.userId,
      },
      include: {
        association: 'User',
        attributes: ['username', 'displayName'],
      },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json({ data: tweets });
  } catch (error) {
    res.status(500).json({ error: 'Error getting tweets.' });
  }
};
