import type { Request } from 'express';
import { request } from '@shared/schemas';

export const requestFactory = (override = {}): Request => {
  request.parse(override);

  return {
    ...override,
  } as Request;
};
