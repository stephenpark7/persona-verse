import { z } from 'zod';
import type { Request, Response } from 'express';

export const createContextParams = z.object({
  req: z.custom<Request>(),
  res: z.custom<Response>(),
});
