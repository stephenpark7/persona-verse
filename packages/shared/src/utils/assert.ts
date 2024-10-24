import type { Response } from 'express';
import { Exception } from './exception';

export const assertIsError: (err: unknown) => asserts err is Error = (
  err: unknown,
): asserts err is Error => {
  if (!(err instanceof Error)) {
    throw err;
  }
};

export const assertIsException: (err: unknown) => asserts err is Exception = (
  err: unknown,
): asserts err is Exception => {
  if (!(err instanceof Exception)) {
    throw err;
  }
};

export const handleException: (
  err: unknown,
  res: Response,
) => asserts err is Exception = (
  err: unknown,
  res: Response,
): asserts err is Exception => {
  assertIsException(err);

  const statusCode = err.getStatusCode();
  const message = err.getMessage();

  res.status(statusCode).json({
    message,
  });
};
