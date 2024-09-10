import { z } from 'zod';
import { registerFunction, loginFunction, logoutFunction } from './functions';

export const apiFunction = z.union([
  registerFunction,
  loginFunction,
  logoutFunction,
]);

export const apiProtocol = z.enum(['rest', 'trpc']);

export const httpRequestParams = z.object({
  method: z.string(),
  controller: z.string(),
  action: z.string(),
  options: z.object({
    withCredentials: z.boolean(),
  }),
  body: z.object({}).optional(),
  headers: z.object({}).optional(),
});

export type ApiFunction = z.infer<typeof apiFunction>;
export type ApiProtocol = z.infer<typeof apiProtocol>;
export type HttpRequestParams = z.infer<typeof httpRequestParams>;
