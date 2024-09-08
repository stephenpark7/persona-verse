import { z } from 'zod';
import { navigateFunction } from './form';
import { requestBody } from './request';

export const ApiFunctionSchema = z
  .function()
  .args(
    requestBody,
    navigateFunction,
    z.object({
      showToast: z.boolean().optional(),
      autoLogin: z.boolean().optional(),
    }),
  )
  .returns(z.promise(z.boolean()));

export type ApiFunction = z.infer<typeof ApiFunctionSchema>;
