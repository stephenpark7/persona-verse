import type { Request } from 'express';

export const extractUserIdFromRequest = (req: Request): number => {
  const userId = req.userId;

  if (userId === undefined || userId === null) {
    throw new Error('User not found.');
  }

  return userId;
};

export const extractMessageFromRequest = (req: Request): string => {
  const body = req.body as { message: string }[] | { message: string };

  let message;

  if (Array.isArray(body)) {
    message = body[0].message;
  } else {
    message = body.message;
  }

  if (message === undefined || message === null) {
    throw new Error('Message not found.');
  }

  if (message.length === 0) {
    throw new Error('Message cannot be empty.');
  }

  return message;
};
