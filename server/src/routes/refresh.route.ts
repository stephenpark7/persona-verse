import express, { Request, Response } from 'express';
import { refresh } from '../controllers/refresh.controller';

const refreshRoute = express.Router();

refreshRoute.post('/', async (req: Request, res: Response): Promise<void> => {
  await refresh(req, res);
});

export { refreshRoute };
