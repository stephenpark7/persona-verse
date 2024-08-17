import express, { Response } from 'express';
import { AuthenticatedRequest } from '../interfaces';
import { auth } from '../middleware/auth';
import { tweetCreate, tweetGet } from 'src/controllers';

export const tweetsRoute = express.Router();

tweetsRoute.post('/create', auth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  await tweetCreate(req, res);
});

tweetsRoute.get('/get', auth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  await tweetGet(req, res);
});
