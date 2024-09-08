import { z } from 'zod';
import { navigateFunction } from '../../form';

export const logoutFunction = z.function().args(
  navigateFunction,
  z.object({
    showToast: z.boolean(),
  }),
);

export type LogoutFunction = z.infer<typeof logoutFunction>;
