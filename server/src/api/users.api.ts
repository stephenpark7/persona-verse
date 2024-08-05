import express, { Request, Response } from 'express';
import { create, login, logout } from '../controllers/user.controller';

const usersApi = express.Router();

usersApi.post('/signup', async (req: Request, res: Response) => {
  await create(req, res);
});

usersApi.post('/login', async (req: Request, res: Response) => {
  await login(req, res);
});

usersApi.post('/logout', async (req: Request, res: Response) => {
  await logout(req, res);
});

export { usersApi };
