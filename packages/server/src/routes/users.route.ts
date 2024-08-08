import express, { Request, Response } from 'express';
import { create, login, logout } from '../controllers/user.controller';

export const usersRoute = express.Router();

usersRoute.post('/signup', async (req: Request, res: Response) => {
  await create(req, res);
});

usersRoute.post('/login', async (req: Request, res: Response) => {
  await login(req, res);
});

usersRoute.post('/logout', async (req: Request, res: Response) => {
  await logout(req, res);
});
