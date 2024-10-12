import { z } from 'zod';

const registerResponse = z.object({
  message: z.string(),
});

export type RegisterResponse = z.infer<typeof registerResponse>;

export const userCreateSchema = z
  .function()
  .args(
    z.object({
      username: z.string(),
      email: z.string(),
      password: z.string(),
    }),
  )
  .returns(registerResponse);

export type CreateUserParams = z.infer<typeof userCreateSchema>;
