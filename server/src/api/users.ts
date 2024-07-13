import express, { Request, Response } from 'express';
import { create, login, logout } from '../controllers/user.controller';
import auth from '../middlewares/auth';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
  await create(req, res);
});

router.post('/login', async (req: Request, res: Response) => {
  await login(req, res);
});

router.post('/logout', auth, async (req: Request, res: Response) => {
  await logout(req, res);
});

export default router;
