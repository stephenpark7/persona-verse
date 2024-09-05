import type { NavigateFunction } from 'react-router-dom';
import { z } from 'zod';
import { ApiFunctionSchema, UserLoginSchema, UserSignupSchema } from './api';
import { TweetPostSchema } from './tweet';
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

export const SubmitFormFunctionSchema = z.function().args(
  z.object({
    e: z.custom<FormEvent<HTMLFormElement>>(),
    formData: z.object({}),
    apiFunction: ApiFunctionSchema,
    navigate: NavigateFunctionSchema,
  }),
);

export type SubmitFormFunction = z.infer<typeof SubmitFormFunctionSchema>;
