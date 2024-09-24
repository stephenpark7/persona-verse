import express, { Request, Response } from 'express';
import { refreshJwt } from '@controllers';

export const refreshRoute = express.Router();

refreshRoute.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await refreshJwt(req);
    res.status(200).json(response);
  }
  catch (err) {
    console.error('Error while trying to refresh token: ', err);
    res.status(400).json({ message: err });
  }
});
