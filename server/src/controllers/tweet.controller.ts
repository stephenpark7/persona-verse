import { Request, Response } from 'express';
import { Tweet } from '../models';

interface CustomRequest extends Request {
  userId?: string;
}

export const create = async (req: CustomRequest, res: Response) => {
  const { message } = req.body;

  if (message.length === 0) {
    return res.status(400).json({ error: 'Message cannot be empty.' });
  }

  try {
    const tweet = await Tweet.create({
      UserId: parseInt(req.userId as string),
      message: message,
      likes: 0
    });
    res.status(200).json({ data: tweet });
  } catch (error) {
    res.status(500).json({ error: 'Error creating tweet.' });
  }
};

export const get = async (req: CustomRequest, res: Response) => {
  try {
    const tweets = await Tweet.findAll({
      attributes: ['message', 'likes'],
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
