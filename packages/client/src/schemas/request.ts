import { z } from 'zod';
import { loginFormFields, registerFormFields } from './form';

export const requestBody = loginFormFields.merge(
  registerFormFields.pick({ email: true }),
);

export type RequestBody = z.infer<typeof requestBody>;
