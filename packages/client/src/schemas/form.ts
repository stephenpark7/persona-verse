import type { NavigateFunction } from 'react-router-dom';
import { z } from 'zod';
import { ApiFunction, RequestBody } from './api';
import { FormEvent } from 'react';

export const NavigateFunctionSchema = z.custom<NavigateFunction>();

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
