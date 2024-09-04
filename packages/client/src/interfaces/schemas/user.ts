import { z } from 'zod';
import { JWTSchema } from './jwt';

// TODO: define schema for tweets

export const UserSchema = z.object({
  value: z.object({
    jwt: JWTSchema,
    tweets: z.array(z.object({})),
  }),
});
