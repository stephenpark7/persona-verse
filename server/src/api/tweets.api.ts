import express, { Response } from 'express';
import { AuthenticatedRequest } from '../interfaces';
import { create, get } from '../controllers/tweet.controller';
import auth from '../middleware/auth';

const tweetsApi = express.Router();

tweetsApi.post('/create', auth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  await create(req, res);
});

tweetsApi.get('/get', auth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  await get(req, res);
});

export { tweetsApi };
