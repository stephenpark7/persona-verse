import { z } from 'zod';
import { JWTSchema } from './jwt';

export const UserSchema = z.object({
  state: z.object({
    value: z.object({
      jwt: JWTSchema,
      tweets: z.array(z.object({})),
    }),
  }),
});
