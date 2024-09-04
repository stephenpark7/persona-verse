import { z } from 'zod';
import { JwtSchema } from './jwt';
import { TweetSchema } from './tweet';

export const UserSignupSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export type UserSignupData = z.infer<typeof UserSignupSchema>;

export const UserLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type UserLoginData = z.infer<typeof UserLoginSchema>;

export const RefreshTokenResponseSchema = z.object({
  jwt: JwtSchema,
});

export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponseSchema>;

//

export const GetTweetsResponseSchema = z.object({
  tweets: z.array(TweetSchema),
});

export const PostTweetResponseSchema = z.object({
  tweet: TweetSchema,
});

export const JsonResponseSchema = z
  .object({
    message: z.string(),
  })
  .extend(RefreshTokenResponseSchema.shape)
  .extend(GetTweetsResponseSchema.shape)
  .extend(PostTweetResponseSchema.shape);

export type JsonResponse = z.infer<typeof JsonResponseSchema>;

export const ApiProtocolSchema = z.enum(['rest', 'trpc']);

export type ApiProtocol = z.infer<typeof ApiProtocolSchema>;
