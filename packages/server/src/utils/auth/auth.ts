import type { Request } from 'express';

export const isAuthHeaderRequired = (url: string) => {
  // URLs that don't require an auth header
  const whitelistedUrls = [
    '/registerUser',
    '/loginUser',
    '/refreshJwt',
    '/logoutUser',
  ];

  return !whitelistedUrls.some((u) => url.startsWith(u));
};

export const extractAuthTokenFromRequest = (req: Request): string => {
  const headers = req.get('authorization');

  if (!headers) {
    throw new Error('No authorization header.');
  }

  const authHeader = headers.split(' ');

  if (authHeader.length !== 2) {
    throw new Error('Invalid authorization header.');
  }

  if (authHeader[0] !== 'Bearer') {
    throw new Error('Invalid token prefix.');
  }

  const token = authHeader[1];

  return token;
};
