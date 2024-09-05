import { z } from 'zod';
import { JwtSchema } from './jwt';
import { TweetPostSchema, TweetSchema } from './tweet';
import {
  RawAxiosRequestConfigSchema,
  RawAxiosRequestHeadersSchema,
} from './axios';
import { NavigateFunctionSchema } from './form';

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

export const RequestBodySchema = z.union([
  UserSignupSchema,
  UserLoginSchema,
  TweetPostSchema,
]);

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

// const RegisterFunctionSchema = z
//   .function()
//   .args(
//     z.object({
//       formData: UserSignupSchema,
//       navigate: NavigateFunctionSchema,
//     }),
//   )
//   .returns(z.promise(z.boolean()));

export const ApiFunctionSchema = z
  .function()
  .args(
    z.object({
      formData: RequestBodySchema,
      navigate: NavigateFunctionSchema,
      showToast: z.boolean().optional(),
      autoLogin: z.boolean().optional(),
    }),
  )
  .returns(z.promise(z.boolean()));
//const register: ({ formData, navigate, showToast, autoLogin, }: RegisterParams) => Promise<boolean>

export const LoginFunctionSchema = z.function();

export type UserSignupData = z.infer<typeof UserSignupSchema>;
export type UserLoginData = z.infer<typeof UserLoginSchema>;
export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponseSchema>;
export type JsonResponse = z.infer<typeof JsonResponseSchema>;
export type ApiProtocol = z.infer<typeof ApiProtocolSchema>;
export type RequestBody = z.infer<typeof RequestBodySchema>;
export type ApiCall = z.infer<typeof ApiCallSchema>;
export type ApiFunction = z.infer<typeof ApiFunctionSchema>;
export type RegisterParams = z.infer<typeof RegisterParamsSchema>;
export type LoginParams = z.infer<typeof LoginParamsSchema>;
// export type RegisterFunction = z.infer<typeof RegisterFunctionSchema>;
export type LoginFunction = z.infer<typeof LoginFunctionSchema>;
