import { Response } from 'express';

export const sendUnauthorizedResponse = (
  res: Response,
  message: string,
  statusCode = 401,
): Response => {
  return res.status(statusCode).json({ message: message });
};
