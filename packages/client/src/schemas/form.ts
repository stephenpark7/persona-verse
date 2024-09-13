import type { NavigateFunction } from 'react-router-dom';
import { z } from 'zod';
import { ApiFunction } from './api';
import { RequestBody } from './request';
import { FormEvent } from 'react';

// TODO: add validation for email and password

export const registerFormFields = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export const loginFormFields = z.object({
  username: z.string(),
  password: z.string(),
});

export const navigateFunction = z.custom<NavigateFunction>();

export const submitFormFunctionArgs = z.object({
  e: z.custom<FormEvent<HTMLFormElement>>(),
  formData: z.custom<RequestBody>(),
  apiFunction: z.custom<ApiFunction>(),
  navigate: navigateFunction,
  options: z.object({
    showToast: z.boolean(),
    autoLogin: z.boolean(),
  }),
});

export const submitFormFunction = z
  .function()
  .args(submitFormFunctionArgs)
  .returns(z.promise(z.void()));

export type RegisterFormFields = z.infer<typeof registerFormFields>;
export type LoginFormFields = z.infer<typeof loginFormFields>;
export type SubmitFormFunction = z.infer<typeof submitFormFunction>;
export type SubmitFormFunctionArgs = z.infer<typeof submitFormFunctionArgs>;
