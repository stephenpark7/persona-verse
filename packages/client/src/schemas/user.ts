import { z } from 'zod';
import { jwtSchema } from './jwt';
import { tweetSchema } from './tweet';

export const userStateProps = z.object({
  jwt: jwtSchema.nullable(),
  tweets: z.array(tweetSchema).nullable(),
});

export const userState = z.object({
  value: userStateProps,
});

export const user = z.object({
  user: userState,
});

export type User = z.infer<typeof user>;
export type UserState = z.infer<typeof userState>;
export type UserProps = z.infer<typeof userStateProps>;
