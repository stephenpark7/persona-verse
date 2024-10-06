import { z } from 'zod';
import { Request } from 'express';

// export const request = z.object({
//   headers: z.record(z.string()).optional(),
//   body: z.unknown().optional(),
//   query: z.record(z.string()).optional(),
//   params: z.record(z.string()).optional(),
// });

export const request = z.custom<Request>();

// export const authenticatedRequest = z.custom<Request>().refine((req) => {
//   return {
//     ...req,
//     token: z.string(),
//     userId: z.number(),
//   };
// });
