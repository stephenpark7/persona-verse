import { z } from 'zod';
// import type { Session } from 'express-session';

export const request = z.custom<Request>();

export const authenticatedRequest = z.custom<Request>();

// request.extend({
//   userId: z.number(),
//   session: z.custom<Session>(),
// });

export const userCreateParams = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export const userLoginParams = z.object({
  username: z.string(),
  password: z.string(),
});
