import { z } from 'zod';
import { UserSchema } from './user';

export const PreloadedStateSchema = z.object({
  user: UserSchema,
});
