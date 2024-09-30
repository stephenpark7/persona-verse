import { z } from 'zod';
import { requestBody } from './request';

export const inputProps = z.object({
  label: z.string(),
  type: z.string(),
  value: z.string().optional(),
  formDataState: z.object({
    formData: requestBody,
    setFormData: z.function().args(requestBody).returns(z.void()),
  }),
});
