import express, { Request, Response } from 'express';
import { refresh } from '../controllers/refresh.controller';

const router = express.Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  await refresh(req, res);
});

export default router;