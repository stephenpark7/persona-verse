import { z } from 'zod';
// import {
//   RawAxiosRequestConfigSchema,
//   RawAxiosRequestHeadersSchema,
// } from './axios';
import { navigateFunction } from './form';
import { requestBody } from './request';

// export const apiProtocol = z.enum(['rest', 'trpc']);

// export const ApiCallSchema = z.object({
//   method: z.string(),
//   controller: z.string(),
//   action: z.string(),
//   body: requestBody.optional(),
//   options: RawAxiosRequestConfigSchema.optional(),
//   headers: RawAxiosRequestHeadersSchema.optional(),
// });

export const ApiFunctionSchema = z
  .function()
  .args(
    requestBody,
    navigateFunction,
    z.object({
      showToast: z.boolean().optional(),
      autoLogin: z.boolean().optional(),
    }),
  )
  .returns(z.promise(z.boolean()));

export type ApiFunction = z.infer<typeof ApiFunctionSchema>;
