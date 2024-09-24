import express, { Request, Response } from 'express';
import { refreshJwt } from '@controllers';

// NOTE: this is for REST API, not for tRPC

export const refreshRoute = express.Router();

refreshRoute.post('/', async (req: Request, res: Response): Promise<void> => {
  // try {
    const response = await refreshJwt(req);
    res.status(200).json(response);
  // }
  // catch (err) {
    // console.log('abc', err);
    // res.status(400).json({ message: err });
    // throw new Error('Session expired. Please login again.');
  // }
});
