import type { Request } from 'express';

export const authenticatedRequestFactory = (override = {}): Request => {
  return {
    ...override,
  } as Request;
};
