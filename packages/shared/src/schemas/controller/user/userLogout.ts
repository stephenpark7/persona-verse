import { z } from 'zod';

export const userLogoutResponse = z.object({
  message: z.string(),
});
