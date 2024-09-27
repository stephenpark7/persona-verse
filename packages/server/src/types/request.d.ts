import { z } from 'zod';
import type { Request as ExpressRequest } from 'express';

export const request = z.custom<ExpressRequest>();

export const authenticatedRequest = request.extend({
  token: z.string(),
  userId: z.number(),
});

export type Request = z.infer<typeof request>;
export type AuthenticatedRequest = z.infer<typeof authenticatedRequest>;
