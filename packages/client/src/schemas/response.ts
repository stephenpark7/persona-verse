import { z } from 'zod';
import { jwtSchema } from './jwt';
import { tweetSchema } from './tweet';

export const refreshTokenResponse = z.object({
  jwt: jwtSchema,
});

export type RefreshTokenResponse = z.infer<typeof refreshTokenResponse>;

export const getTweetsResponse = z.object({
  tweets: z.array(tweetSchema),
});

export const postTweetResponse = z.object({
  tweet: tweetSchema,
});

export const jsonResponse = z
  .object({
    message: z.string(),
  })
  .extend(refreshTokenResponse.partial().shape)
  .extend(getTweetsResponse.partial().shape)
  .extend(postTweetResponse.partial().shape);

export type JsonResponse = z.infer<typeof jsonResponse>;
