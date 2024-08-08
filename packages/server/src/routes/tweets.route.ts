import express, { Response } from 'express';
import { AuthenticatedRequest } from '../interfaces';
import { auth } from '../middleware/auth';
import { create, get } from '../controllers/tweet.controller';

export const tweetsRoute = express.Router();

tweetsRoute.post('/create', auth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  await create(req, res);
});

tweetsRoute.get('/get', auth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  await get(req, res);
});
