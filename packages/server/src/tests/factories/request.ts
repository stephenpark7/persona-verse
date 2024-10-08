import { JwtPayload } from '@shared/types';
import type { Request } from 'express';

export const requestFactory = (refreshToken: JwtPayload): Request => {
  return {
    session: {
      refreshToken,
    },
  } as Request;
};
