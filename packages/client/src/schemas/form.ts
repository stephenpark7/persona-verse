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

export const loginFormFields = z.object({
  username: z.string(),
  password: z.string(),
});

export const navigateFunction = z.custom<NavigateFunction>();

export const submitFormFunction = z.function().args(
  z.custom<FormEvent<HTMLFormElement>>(),
  z.custom<RequestBody>(),
  z.custom<ApiFunction>(),
  navigateFunction,
  z.object({
    showToast: z.boolean(),
    autoLogin: z.boolean(),
  }),
);

export type RegisterFormFields = z.infer<typeof registerFormFields>;
export type LoginFormFields = z.infer<typeof loginFormFields>;
export type SubmitFormFunction = z.infer<typeof submitFormFunction>;
