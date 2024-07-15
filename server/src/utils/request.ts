import { Response } from 'express';

function statusUnauthorized(res: Response, message: string) {
  const errorMessage = process.env.NODE_ENV === 'development' ? `\n${message}` : '';
  return res.status(401).json({ message: `Unauthorized.${errorMessage}` });
}

export {
  statusUnauthorized,
};
