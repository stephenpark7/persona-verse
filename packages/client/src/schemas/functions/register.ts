import { z } from 'zod';
import { navigateFunction } from '../form';
import { requestBody } from '../request';

export const registerFunction = z
  .function()
  .args(
    requestBody,
    navigateFunction,
    z
      .object({
        showToast: z.boolean(),
        autoLogin: z.boolean(),
      })
      .partial(),
  )
  .returns(z.promise(z.boolean()));

export type RegisterFunction = z.infer<typeof registerFunction>;
