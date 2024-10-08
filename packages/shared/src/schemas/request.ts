import { z } from 'zod';

export const request = z.object({
  headers: z.record(z.string()).optional(),
  body: z.unknown().optional(),
  query: z.record(z.string()).optional(),
  params: z.record(z.string()).optional(),
});

export const authenticatedRequest = request.extend({
  // token: z.string(),
  userId: z.number(),
  session: z.object({
    refreshToken: z.string(),
  }),
});
