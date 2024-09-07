import { z } from 'zod';
import { jwtSchema } from './jwt';

export const TweetSchema = z.object({
  id: z.number(),
  message: z.string(),
  createdAt: z.string(),
  User: z.object({
    username: z.string(),
  }),
});

export const TweetPostSchema = z.object({
  message: z.string(),
});

export const PostTweetSchema = z.object({
  jwt: jwtSchema,
  payload: TweetPostSchema,
});

export type TweetData = z.infer<typeof TweetSchema>;
export type TweetPostData = z.infer<typeof TweetPostSchema>;
export type PostTweetData = z.infer<typeof PostTweetSchema>;
