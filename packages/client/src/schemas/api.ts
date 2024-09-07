import { z } from 'zod';
import { JwtSchema } from './jwt';
import { TweetSchema } from './tweet';
import {
  RawAxiosRequestConfigSchema,
  RawAxiosRequestHeadersSchema,
} from './axios';
import { NavigateFunctionSchema } from './form';

// TODO: rename since they are form fields

export const registerFormFields = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export const loginFormFields = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginFormFields = z.infer<typeof loginFormFields>;

export const refreshTokenResponse = z.object({
  jwt: JwtSchema,
});

export const getTweetsResponse = z.object({
  tweets: z.array(TweetSchema),
});

export const postTweetResponse = z.object({
  tweet: TweetSchema,
});

// export const JsonResponseSchema = z
//   .object({
//     message: z.string(),
//   })
//   .extend(refreshTokenResponse.partial());
// .extend(getTweetsResponse.partial().shape)x
// .extend(postTweetResponse.partial().shape);
// .extend(z.object({}).partial().shape);

export const apiProtocol = z.enum(['rest', 'trpc']);

// Request Body

export const requestBody = registerFormFields.merge(loginFormFields).partial();

export type RequestBody = z.infer<typeof requestBody>;

export const ApiCallSchema = z.object({
  method: z.string(),
  controller: z.string(),
  action: z.string(),
  body: requestBody.optional(),
  options: RawAxiosRequestConfigSchema.optional(),
  headers: RawAxiosRequestHeadersSchema.optional(),
});

// Register

export const registerFunction = z
  .function()
  .args(
    requestBody,
    NavigateFunctionSchema,
    z
      .object({
        showToast: z.boolean(),
        autoLogin: z.boolean(),
      })
      .partial(),
  )
  .returns(z.promise(z.boolean()));

export type RegisterFunction = z.infer<typeof registerFunction>;

// Login

export const loginFunction = z
  .function()
  .args(
    requestBody,
    NavigateFunctionSchema,
    z
      .object({
        showToast: z.boolean(),
      })
      .partial(),
  )
  .returns(z.promise(z.boolean()));

export type LoginFunction = z.infer<typeof loginFunction>;

// Logout

export const logoutFunction = z.function().args(
  NavigateFunctionSchema,
  z.object({
    showToast: z.boolean(),
  }),
);

export type LogoutFunction = z.infer<typeof logoutFunction>;

// Api Function

export const ApiFunctionSchema = z
  .function()
  .args(
    z
      .object({
        username: z.string(),
        email: z.string(),
        password: z.string(),
        message: z.string(),
      })
      .partial(),
    NavigateFunctionSchema,
    z.object({
      showToast: z.boolean().optional(),
      autoLogin: z.boolean().optional(),
    }),
  )
  .returns(z.promise(z.boolean()));
