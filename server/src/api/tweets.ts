import express, { Request, Response } from 'express';
import { create, get } from '../controllers/tweet.controller';
import auth from '../middlewares/auth';
import { AuthenticatedRequest } from '../interfaces';

const router = express.Router();

router.post('/create', auth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  await create(req, res);
});

router.get('/get', auth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  await get(req, res);
});

export default router;
