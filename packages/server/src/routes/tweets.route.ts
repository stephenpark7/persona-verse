import express, { Response } from 'express';
import { AuthenticatedRequest } from '../interfaces';
import { auth } from '../middleware/auth';
import { tweetCreate, tweetGet } from '@controllers';

export const tweetsRoute = express.Router();

tweetsRoute.post('/create', auth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const tweet = await tweetCreate(req);
    res.status(201).json(tweet);
  }
  catch (err) {
    console.error('Error while trying to create a tweet: ', err);
    res.status(400).json({ message: err });
  }
});

tweetsRoute.get('/get', auth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const tweets = await tweetGet(req);
    res.status(200).json(tweets);
  }
  catch (err) {
    console.error('Error while trying to get tweets: ', err);
    res.status(400).json({ message: err });
  }
});
