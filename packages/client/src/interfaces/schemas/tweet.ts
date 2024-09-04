import { z } from 'zod';
import { JWTSchema } from './jwt';

export const TweetSchema = z.object({
  id: z.number(),
  message: z.string(),
  createdAt: z.string(),
  User: z.object({
    username: z.string(),
  }),
});

export const TweetPostParamsSchema = z.object({
  message: z.string(),
});

export const PostTweetSchema = z.object({
  jwt: JWTSchema,
  payload: TweetPostParamsSchema,
});

export type TweetData = z.infer<typeof TweetSchema>;
export type TweetPostParamsProps = z.infer<typeof TweetPostParamsSchema>;
export type PostTweetData = z.infer<typeof PostTweetSchema>;
