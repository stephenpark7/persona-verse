import { z } from 'zod';
import { registerFormFields, loginFormFields } from './form';

export const requestBody = z.union([registerFormFields, loginFormFields]);

export type RequestBody = z.infer<typeof requestBody>;
