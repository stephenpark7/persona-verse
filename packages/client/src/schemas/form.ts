import type { NavigateFunction } from 'react-router-dom';
import { z } from 'zod';
import {
  ApiFunction,
  ApiFunctionSchema,
  LoginParamsSchema,
  LogoutFunctionSchema,
  RegisterParamsSchema,
  RequestBody,
  RequestBodySchema,
  // UserLoginSchema,
  // UserSignupSchema,
} from './api';
// import { TweetPostSchema } from './tweet';
import { FormEvent } from 'react';

// TODO: don't use custom types since validation functions are not provided

export const NavigateFunctionSchema = z.custom<NavigateFunction>();

// export const SubmitFormSchema = z.object({
//   e: z.object({
//     preventDefault: z.function(),
//   }),
//   formData: z.union([UserSignupSchema, UserLoginSchema, TweetPostSchema]),
//   apiFunction: ApiFunctionSchema,
//   navigate: NavigateFunctionSchema,
// });

// export type SubmitForm = z.infer<typeof SubmitFormSchema>;

// export const SubmitFormFunctionSchema = z.function().args(
//   z.object({
//     e: z.custom<FormEvent<HTMLFormElement>>(),
//     // formData: RequestBodySchema,
//     formData: z.object({}),
//     apiFunction: z
//       .function()
//       .args(
//         z.union([
//           RegisterParamsSchema,
//           LoginParamsSchema,
//           LogoutFunctionSchema,
//         ]),
//       ),
//     navigate: NavigateFunctionSchema,
//   }),
// );

export const SubmitFormFunctionSchema = z.function().args(
  z.custom<FormEvent<HTMLFormElement>>(), // e
  z.custom<RequestBody>(), // formData
  z.custom<ApiFunction>(), // apiFunction
  NavigateFunctionSchema, // navigate
  z.object({
    showToast: z.boolean(),
    autoLogin: z.boolean(),
  }),
);

export type SubmitFormFunction = z.infer<typeof SubmitFormFunctionSchema>;
