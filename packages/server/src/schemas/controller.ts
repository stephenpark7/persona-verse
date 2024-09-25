import { z } from 'zod';

export const userCreateSchema = z.function().args(
  z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
  }),
);

export type CreateUserParams = z.infer<typeof userCreateSchema>;
