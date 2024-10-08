import { z } from 'zod';

export const requestSchema = z.object({
  headers: z.record(z.string()).optional(),
  body: z.unknown().optional(),
  query: z.record(z.string()).optional(),
  params: z.record(z.string()).optional(),
});

export const authenticatedRequestSchema = requestSchema.extend({
  token: z.string(),
  userId: z.number(),
});
