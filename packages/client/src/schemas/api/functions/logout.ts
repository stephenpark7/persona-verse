import { z } from 'zod';
import { navigateFunction } from '../../form';

export const logoutFunction = z
  .function()
  .args(
    z.object({}),
    navigateFunction,
    z
      .object({
        showToast: z.boolean(),
      })
      .partial(),
  )
  .returns(z.promise(z.boolean()));

export type LogoutFunction = z.infer<typeof logoutFunction>;
