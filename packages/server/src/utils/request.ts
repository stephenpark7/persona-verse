import { AuthenticatedRequest } from '@shared/types';
import { Response } from 'express';

export const sendUnauthorizedResponse = (
  res: Response,
  message: string,
  statusCode = 401,
): Response => {
  return res.status(statusCode).json({ message: message });
};

export const extractUserIdFromRequest = (req: AuthenticatedRequest): number => {
  const userId = req.userId;

  if (userId === undefined || userId === null) {
    throw new Error('User not found.');
  }

  return userId;
};

export const extractMessageFromRequest = (
  req: AuthenticatedRequest,
): string => {
  const body = req.body as { message: string }[];
  const message = body[0].message;

  if (message === undefined || message === null) {
    throw new Error('Message not found.');
  }

  if (message.length === 0) {
    throw new Error('Message cannot be empty.');
  }

  return message;
};
