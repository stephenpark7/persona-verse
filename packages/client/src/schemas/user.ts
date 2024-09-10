import { z } from 'zod';
import { jwtSchema } from './jwt';
import { tweetSchema } from './tweet';

export const StatePropertiesSchema = z.object({
  jwt: jwtSchema.nullable(),
  tweets: z.array(tweetSchema).nullable(),
});

export const StateSchema = z.object({
  value: StatePropertiesSchema,
});

export const UserSchema = z.object({
  user: StateSchema,
});

export type User = z.infer<typeof UserSchema>;
export type State = z.infer<typeof StateSchema>;
