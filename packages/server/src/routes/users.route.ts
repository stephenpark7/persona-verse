import express, { Request, Response } from 'express';
import { userCreate, userLogin, userLogout } from 'src/controllers';

export const usersRoute = express.Router();

usersRoute.post('/signup', async (req: Request, res: Response) => {
  try {
    const message = await userCreate(req.body);
    res.status(201).json({ message });
  }
  catch (err) {
    console.error('Error while trying to create a user: ', err);
    res.status(400).json({ message: err });
  }
});

usersRoute.post('/login', async (req: Request, res: Response) => {
  // try {
    const response = await userLogin(req.body, req);
    res.status(200).json(response);
  // }
  // catch (err) {
  //   console.error('Error while trying to log in a user: ', err);
  //   res.status(400).json({ message: err });
  // }
});

usersRoute.post('/logout', async (req: Request) => {
  await userLogout(req);
});
