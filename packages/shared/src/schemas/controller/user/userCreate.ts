import { z } from 'zod';

export const userCreateParams = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export const userCreateResponse = z.object({
  message: z.string(),
});

export const userCreateSchema = z
  .function()
  .args(userCreateParams)
  .returns(userCreateResponse);
