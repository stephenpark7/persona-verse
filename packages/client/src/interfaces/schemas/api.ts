import { z } from 'zod';
import { JwtSchema } from './jwt';

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

export const RefreshTokenResponseSchema = z.object({
  jwt: JwtSchema,
});

export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponseSchema>;

export const JsonResponseSchema = RefreshTokenResponseSchema.extend({
  message: z.string(),
});

export type JsonResponse = z.infer<typeof JsonResponseSchema>;
