import { z } from 'zod';
import { ApiFunctionSchema, RequestBodySchema } from './api';
import type { NavigateOptions } from 'react-router-dom';
import type { To } from '@remix-run/router';

// TODO: don't use custom types since validation functions are not provided

export const NavigateFunctionSchema = z
  .function()
  .args(
    z.union([
      z.tuple([z.custom<To>(), z.optional(z.custom<NavigateOptions>())]),
      z.tuple([z.number()]),
    ]),
  )
  .returns(z.void());

export const SubmitFormSchema = z.object({
  e: z.object({
    preventDefault: z.function(),
  }),
  formData: RequestBodySchema,
  apiFunction: ApiFunctionSchema,
  navigate: NavigateFunctionSchema,
});

export type SubmitForm = z.infer<typeof SubmitFormSchema>;
