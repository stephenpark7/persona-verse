import { z } from 'zod';
import { navigateFunction } from '../form';
import { requestBody } from '../request';

export const loginFunction = z
  .function()
  .args(
    requestBody,
    navigateFunction,
    z
      .object({
        showToast: z.boolean(),
      })
      .partial(),
  )
  .returns(z.promise(z.boolean()));

export type LoginFunction = z.infer<typeof loginFunction>;
