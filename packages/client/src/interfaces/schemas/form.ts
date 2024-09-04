import { z } from 'zod';
import { ApiFunctionSchema, RequestBodySchema } from './api';

export const SubmitFormSchema = z.object({
  e: z.object({
    preventDefault: z.function(),
  }),
  formData: RequestBodySchema,
  apiFunction: ApiFunctionSchema,
  navigate: z.function(),
});
