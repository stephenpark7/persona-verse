import { z } from 'zod';
import { jwtSchema } from './jwt';
import { tweetSchema } from './tweet';

export const statePropertiesSchema = z.object({
  jwt: jwtSchema.nullable(),
  tweets: z.array(tweetSchema).nullable(),
});

export const stateSchema = z.object({
  value: statePropertiesSchema,
});

export const userSchema = z.object({
  user: stateSchema,
});

export type User = z.infer<typeof userSchema>;
export type State = z.infer<typeof stateSchema>;
