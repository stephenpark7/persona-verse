import { Response } from 'express';
import { AuthenticatedRequest, CreateRequestBody } from '../interfaces';
import { Tweet } from '../models';

export const create = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const requestBody: CreateRequestBody = req.body;
    const requestBodyMessage: string = requestBody.message;
    const userId = req.userId;
  
    if (requestBodyMessage.length === 0) {
      return res.status(400).json({ requestBodyMessage: 'Message cannot be empty.' });
    }

    const tweet: Tweet = await Tweet.create({
      UserId: userId,
      message: requestBodyMessage,
      likes: 0,
    });

    res.status(200).json({ data: {
      message: requestBodyMessage,
      likes: 0,
      createdAt: tweet.getDataValue('createdAt'),
    } });
;  } catch (error: unknown) {
    const errorMessage = process.env.NODE_ENV === 'development' ? `\n${error}` : '';
    res.status(500).json({ message: `Error posting tweet.${errorMessage}` })
  }
};

export const get = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const tweets = await Tweet.findAll({
      attributes: [ 'message', 'likes', 'createdAt' ],
      where: {
        UserId: req.userId,
      },
      include: {
        association: 'User',
        attributes: [ 'username', 'displayName' ],
      },
      order: [ [ 'createdAt', 'DESC' ] ],
    });
    res.status(200).json({ data: tweets });
  } catch (error: unknown) {
    const errorMessage = process.env.NODE_ENV === 'development' ? `\n${error}` : '';
    res.status(500).json({ message: `Error getting tweets.${errorMessage}` });
  }
};
