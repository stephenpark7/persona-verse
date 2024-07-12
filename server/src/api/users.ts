import express, { Request, Response } from 'express';
import { create, login } from '../controllers/user.controller';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
  await create(req, res);
});

router.post('/login', async (req: Request, res: Response) => {
  await login(req, res);
});

export default router;
