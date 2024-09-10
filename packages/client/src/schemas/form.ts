import type { NavigateFunction } from 'react-router-dom';
import { z } from 'zod';
import { ApiFunction } from './api';
import { RequestBody } from './request';
import { FormEvent } from 'react';

export const registerFormFields = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export type RegisterFormFields = z.infer<typeof registerFormFields>;

export const loginFormFields = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginFormFields = z.infer<typeof loginFormFields>;

export const navigateFunction = z.custom<NavigateFunction>();

export const submitFormFunction = z.function().args(
  z.custom<FormEvent<HTMLFormElement>>(), // e
  z.custom<RequestBody>(), // formData
  z.custom<ApiFunction>(), // apiFunction
  navigateFunction, // navigate
  z.object({
    showToast: z.boolean(),
    autoLogin: z.boolean(),
  }),
);

export type SubmitFormFunction = z.infer<typeof submitFormFunction>;
