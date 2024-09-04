import { z } from 'zod';

export const UserSignupSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export type UserSignupData = z.infer<typeof UserSignupSchema>;

export const UserLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type UserLoginData = z.infer<typeof UserLoginSchema>;
