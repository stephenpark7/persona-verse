import { z } from 'zod';
import { jwtSchema } from './jwt';

export const tweetSchema = z.object({
  id: z.number(),
  message: z.string(),
  createdAt: z.string(),
  User: z.object({
    username: z.string(),
  }),
});

export const tweetPostSchema = z.object({
  message: z.string(),
});

export const postTweetSchema = z.object({
  jwt: jwtSchema,
  payload: tweetPostSchema,
});

export type Tweet = z.infer<typeof tweetSchema>;
export type TweetPostData = z.infer<typeof tweetPostSchema>;
export type PostTweetData = z.infer<typeof postTweetSchema>;
