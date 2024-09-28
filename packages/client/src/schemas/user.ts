import { z } from 'zod';
import { Jwt } from './jwt';
import { Tweet } from './tweet';
import { Profile } from './profile';

export const userStateProps = z.object({
  jwt: z.custom<Jwt>().nullable(),
  tweets: z.array(z.custom<Tweet>()).nullable(),
  profile: z.custom<Profile>().nullable(),
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
