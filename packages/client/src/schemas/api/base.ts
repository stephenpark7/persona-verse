import { z } from 'zod';
import { registerFunction, loginFunction, logoutFunction } from './functions';

export const apiFunction = z.union([
  registerFunction,
  loginFunction,
  logoutFunction,
]);

export type ApiFunction = z.infer<typeof apiFunction>;
