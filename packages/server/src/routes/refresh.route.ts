import express, { Request, Response } from 'express';
import { refresh } from '../controllers/refresh.controller';

export const refreshRoute = express.Router();

refreshRoute.post('/', async (req: Request, res: Response): Promise<void> => {
  await refresh(req, res);
});