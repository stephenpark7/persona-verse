import { z } from 'zod';
import { jwtSchema } from './jwt';
import { tweetSchema } from './tweet';

export const stateProperties = z.object({
  jwt: jwtSchema.nullable(),
  tweets: z.array(tweetSchema).nullable(),
  docTitle: z.string(),
});

export const state = z.object({
  value: stateProperties,
});

export const user = z.object({
  user: state,
});

export type User = z.infer<typeof user>;
export type State = z.infer<typeof state>;
