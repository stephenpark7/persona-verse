import { z } from 'zod';
import { JwtSchema } from './jwt';
import { TweetSchema } from './tweet';

export const StatePropertiesSchema = z.object({
  jwt: JwtSchema.nullable(),
  tweets: z.array(z.array(TweetSchema)).nullable(),
});

export const StateSchema = z.object({
  value: StatePropertiesSchema,
});

export const UserSchema = z.object({
  user: StateSchema,
});

export type User = z.infer<typeof UserSchema>;
export type State = z.infer<typeof StateSchema>;
