import { Response } from 'express';

function sendUnauthorizedResponse(res: Response, message: string, statusCode: number = 401) {
  // const errorMessage = process.env.NODE_ENV === 'development' ? `\n${message}` : '';
  return res.status(statusCode).json({ message: message });
}

export {
  sendUnauthorizedResponse,
};
