import { z } from 'zod';
import {
  UserSignupSchema,
  UserLoginSchema,
  RefreshTokenResponseSchema,
  JsonResponseSchema,
  ApiProtocolSchema,
  RequestBodySchema,
  ApiCallSchema,
  RegisterParamsSchema,
  LoginParamsSchema,
  RegisterFunctionSchema,
  LoginFunctionSchema,
  LogoutFunctionSchema,
  ApiFunctionSchema,
  LogoutParamsSchema,
} from '../api';

export type UserSignupData = z.infer<typeof UserSignupSchema>;
export type UserLoginData = z.infer<typeof UserLoginSchema>;
export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponseSchema>;
export type JsonResponse = z.infer<typeof JsonResponseSchema>;
export type ApiProtocol = z.infer<typeof ApiProtocolSchema>;
export type RequestBody = z.infer<typeof RequestBodySchema>;
export type ApiCall = z.infer<typeof ApiCallSchema>;
export type RegisterParams = z.infer<typeof RegisterParamsSchema>;
export type LoginParams = z.infer<typeof LoginParamsSchema>;
export type RegisterFunction = z.infer<typeof RegisterFunctionSchema>;
export type LoginFunction = z.infer<typeof LoginFunctionSchema>;
export type LogoutFunction = z.infer<typeof LogoutFunctionSchema>;
export type ApiFunction = z.infer<typeof ApiFunctionSchema>;
export type LogoutParams = z.infer<typeof LogoutParamsSchema>;
