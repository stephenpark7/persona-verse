import { z } from 'zod';
import { NavigateFunction } from 'react-router-dom';
import { JsonResponse, RequestBody } from '@schemas';

export const apiProtocol = z.enum(['rest', 'trpc']);

export const httpRequestParams = z.object({
  method: z.string(),
  controller: z.string(),
  action: z.string(),
  options: z
    .object({
      withCredentials: z.boolean(),
    })
    .optional(),
  body: z.object({}).optional(),
  headers: z.object({}).optional(),
});

export const apiFunction = z.function().args(
  z.object({
    formData: z.custom<RequestBody>(),
    navigateFunction: z.custom<NavigateFunction>(),
    options: z.object({
      showToast: z.boolean(),
      autoLogin: z.boolean(),
    }),
  }),
);

export const apiCallFunction = z
  .function()
  .args(
    z.object({
      params: httpRequestParams,
      showToast: z.boolean(),
      protocol: apiProtocol,
    }),
  )
  .returns(z.promise(z.custom<JsonResponse>().or(z.void())));

export type ApiFunction = z.infer<typeof apiFunction>;
export type ApiCallFunction = z.infer<typeof apiCallFunction>;
export type ApiProtocol = z.infer<typeof apiProtocol>;
export type HttpRequestParams = z.infer<typeof httpRequestParams>;
