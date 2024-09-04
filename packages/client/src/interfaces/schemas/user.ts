import { z } from 'zod';
import { JwtSchema } from './jwt';
import { TweetSchema } from './tweet';

export const UserSchema = z.object({
  value: z.object({
    jwt: JwtSchema,
    tweets: z.array(z.array(TweetSchema)),
  }),
});
