import express, { Response } from 'express';
import { AuthenticatedRequest } from '../interfaces';
import { refresh } from '../controllers/refresh.controller';

const router = express.Router();

router.post('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  await refresh(req, res);
});

export default router;
