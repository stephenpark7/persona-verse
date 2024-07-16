import { Response } from 'express';

function statusUnauthorized(res: Response, message: string, statusCode = 401) {
  const errorMessage = process.env.NODE_ENV === 'development' ? `\n${message}` : '';
  return res.status(statusCode).json({ message: `Unauthorized.${errorMessage}` });
}

export {
  statusUnauthorized,
};
