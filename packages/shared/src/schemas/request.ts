import { z } from 'zod';

export const request = z.object({
  headers: z.record(z.string()).optional(),
  body: z.unknown().optional(),
  query: z.record(z.string()).optional(),
  params: z.record(z.string()).optional(),
  url: z.string(),
});

export const authenticatedRequest = request.extend({
  userId: z.number(),
  session: z.object({
    refreshToken: z.object({
      token: z.string(),
    }),
  }),
});

export const userCreateParams = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export const userLoginParams = z.object({
  username: z.string(),
  password: z.string(),
});
