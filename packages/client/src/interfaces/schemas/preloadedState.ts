import { z } from 'zod';
import { UserSchema } from './user';
import { TweetAPISchema } from './tweet';

export const PreloadedStateSchema = z.object({
  user: z.union([UserSchema, z.undefined()]),
  tweetAPI: z.union([TweetAPISchema, z.undefined()]),
});
