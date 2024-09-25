// import { z } from 'zod';

// export const request = z.object({
//   // message: z.string(),
//   body: z.tuple([ z.object({ message: z.string() }) ]),
// });

// export type Request = z.infer<typeof request>;

// export const authenticatedRequest = request.extend({
//   token: z.string(),
//   userId: z.number(),
// });

// export type AuthenticatedRequest = z.infer<typeof authenticatedRequest>;

// export const jwtPayload = z.object({
//   userId: z.number(),
//   username: z.string(),
//   expiresAt: z.number().optional(),
//   jti: z.string().optional(),
// });

// export type JwtPayload = z.infer<typeof jwtPayload>;
