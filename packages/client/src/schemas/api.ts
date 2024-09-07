import { z } from 'zod';
import { JwtSchema } from './jwt';
import { TweetSchema } from './tweet';
import {
  RawAxiosRequestConfigSchema,
  RawAxiosRequestHeadersSchema,
} from './axios';
import { NavigateFunctionSchema } from './form';

// TODO: rename since they are form fields

export const UserSignupSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export const UserLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const RefreshTokenResponseSchema = z.object({
  jwt: JwtSchema,
});

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
// .extend(z.object({}).partial().shape);

export const ApiProtocolSchema = z.enum(['rest', 'trpc']);

export const RequestBodySchema = z.object({
  username: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  message: z.string().optional(),
});

export const ApiCallSchema = z.object({
  method: z.string(),
  controller: z.string(),
  action: z.string(),
  body: RequestBodySchema.optional(),
  options: RawAxiosRequestConfigSchema.optional(),
  headers: RawAxiosRequestHeadersSchema.optional(),
});

export const RegisterParamsSchema = z.object({
  formData: UserSignupSchema,
  navigate: NavigateFunctionSchema,
  showToast: z.boolean().optional(),
  autoLogin: z.boolean().optional(),
});

export const LoginParamsSchema = z.object({
  formData: UserLoginSchema,
  navigate: NavigateFunctionSchema,
  showToast: z.boolean().optional(),
});

export const LogoutParamsSchema = z.object({
  navigate: NavigateFunctionSchema,
  showToast: z.boolean().optional(),
});

export const RegisterFunctionSchema = z
  .function()
  .args(
    z.object({
      username: z.string(),
      email: z.string(),
      password: z.string(),
    }),
    NavigateFunctionSchema,
    z.object({
      showToast: z.boolean().optional(),
      autoLogin: z.boolean().optional(),
    }),
  )
  .returns(z.promise(z.boolean()));

export const LoginFunctionSchema = z
  .function()
  .args(
    z.object({
      username: z.string(),
      password: z.string(),
    }),
    NavigateFunctionSchema,
    z.object({
      showToast: z.boolean().optional(),
    }),
  )
  .returns(z.promise(z.boolean()));

export const LogoutFunctionSchema = z.function().args(
  z.object({
    username: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
  }),
  NavigateFunctionSchema,
  z.object({
    showToast: z.boolean(),
  }),
);

export const ApiFunctionSchema = z
  .function()
  .args(
    z.object({
      username: z.string(),
      email: z.string(),
      password: z.string(),
    }),
    NavigateFunctionSchema,
    z.object({
      showToast: z.boolean().optional(),
      autoLogin: z.boolean().optional(),
    }),
  )
  .returns(z.promise(z.boolean()));
