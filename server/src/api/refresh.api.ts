import express, { Request, Response } from 'express';
import { refresh } from '../controllers/refresh.controller';

const refreshApi = express.Router();

refreshApi.post('/', async (req: Request, res: Response): Promise<void> => {
  await refresh(req, res);
});

export { refreshApi };
