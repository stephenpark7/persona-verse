import { z } from 'zod';
import { navigateFunction } from '../../form';
import { requestBody } from '../../request';

export const registerFunction = z
  .function()
  .args(
    z.object({
      formData: requestBody,
      navigateFunction: navigateFunction,
      options: z.object({
        showToast: z.boolean(),
        autoLogin: z.boolean(),
      }),
    }),
  )
  .returns(z.promise(z.boolean()));

export type RegisterFunction = z.infer<typeof registerFunction>;
