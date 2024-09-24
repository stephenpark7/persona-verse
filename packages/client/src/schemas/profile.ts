import { z } from 'zod';

export const profile = z.object({
  displayName: z.string(),
  picture: z.string(),
  bio: z.string(),
});

export type Profile = z.infer<typeof profile>;
