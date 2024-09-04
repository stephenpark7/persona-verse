import { z } from 'zod';
import { JwtSchema } from './jwt';
import { TweetPostSchema, TweetSchema } from './tweet';
import type {
  RawAxiosRequestConfig,
  RawAxiosRequestHeaders,
  AxiosRequestHeaders,
} from 'axios';

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
  .extend(RefreshTokenResponseSchema.partial().shape)
  .extend(GetTweetsResponseSchema.partial().shape)
  .extend(PostTweetResponseSchema.partial().shape);

export type JsonResponse = z.infer<typeof JsonResponseSchema>;

export const ApiProtocolSchema = z.enum(['rest', 'trpc']);

export type ApiProtocol = z.infer<typeof ApiProtocolSchema>;

export const RequestBodySchema = z.union([
  UserSignupSchema,
  UserLoginSchema,
  TweetPostSchema,
]);

export type RequestBody = z.infer<typeof RequestBodySchema>;

export const ApiCallSchema = z.object({
  method: z.string(),
  controller: z.string(),
  action: z.string(),
  body: RequestBodySchema,
  // options: RawAxiosRequestConfig,
  // headers: RawAxiosRequestHeaders | AxiosRequestHeaders,
});
