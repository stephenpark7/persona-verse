import { z } from 'zod';
import { navigateFunction } from '../../form';
import { requestBody } from '../../request';

export const loginFunction = z
  .function()
  .args(
    z.object({
      formData: requestBody,
      navigateFunction: navigateFunction,
      options: z.object({
        showToast: z.boolean(),
      }),
    }),
  )
  .returns(z.promise(z.boolean()));

export type LoginFunction = z.infer<typeof loginFunction>;
