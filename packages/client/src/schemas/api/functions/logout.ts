import { z } from 'zod';
import { navigateFunction } from '../../form';

export const logoutFunction = z
  .function()
  .args(
    z.object({
      formData: z.null(),
      navigateFunction: navigateFunction,
      options: z.object({
        showToast: z.boolean(),
      }),
    }),
  )
  .returns(z.promise(z.boolean()));

export type LogoutFunction = z.infer<typeof logoutFunction>;
