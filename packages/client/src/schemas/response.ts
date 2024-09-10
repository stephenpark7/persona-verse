import { z } from 'zod';
import { jwtSchema } from './jwt';
import { TweetSchema } from './tweet';

export const refreshTokenResponse = z.object({
  jwt: jwtSchema,
});

export const getTweetsResponse = z.object({
  tweets: z.array(TweetSchema),
});

export const postTweetResponse = z.object({
  tweet: TweetSchema,
});

export const jsonResponse = z
  .object({
    message: z.string(),
  })
  .extend(refreshTokenResponse.partial().shape)
  .extend(getTweetsResponse.partial().shape)
  .extend(postTweetResponse.partial().shape);

export type JsonResponse = z.infer<typeof jsonResponse>;
