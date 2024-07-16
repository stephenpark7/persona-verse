import express, { Response } from 'express';
import { AuthenticatedRequest } from '../interfaces';
import { create, get } from '../controllers/tweet.controller';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/create', auth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  await create(req, res);
});

router.get('/get', auth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  await get(req, res);
});

export default router;
