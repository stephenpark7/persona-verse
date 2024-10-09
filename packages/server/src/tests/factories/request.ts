import type { Request } from 'express';

export const requestFactory = (override = {}): Request => {
  return {
    ...override,
  } as Request;
};
