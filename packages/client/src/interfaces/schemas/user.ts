import { z } from 'zod';
import { JWTSchema } from './jwt';
import { TweetSchema } from './tweet';

export const UserSchema = z.object({
  value: z.object({
    jwt: JWTSchema,
    tweets: z.array(z.array(TweetSchema)),
  }),
});
