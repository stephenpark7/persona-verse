import { z } from 'zod';

// TODO: maybe just use types from axios instead

export const RawAxiosRequestConfigSchema = z.object({
  url: z.string().optional(),
  method: z.string().optional(),
  baseURL: z.string().optional(),
  transformRequest: z.union([z.function(), z.array(z.function())]).optional(),
  transformResponse: z.union([z.function(), z.array(z.function())]).optional(),
  headers: z.union([z.object({}).partial(), z.object({}).partial()]).optional(),
  params: z.any().optional(),
  paramsSerializer: z.union([z.object({}), z.function()]).optional(),
  data: z.any().optional(),
  timeout: z.number().optional(),
  timeoutErrorMessage: z.string().optional(),
  withCredentials: z.boolean().optional(),
  adapter: z.union([z.function(), z.array(z.function())]).optional(),
  auth: z
    .object({
      username: z.string(),
      password: z.string(),
    })
    .optional(),
  responseType: z.string().optional(),
  responseEncoding: z.string().optional(),
  xsrfCookieName: z.string().optional(),
  xsrfHeaderName: z.string().optional(),
  onUploadProgress: z.function().optional(),
  onDownloadProgress: z.function().optional(),
  maxContentLength: z.number().optional(),
  validateStatus: z.union([z.function(), z.null()]).optional(),
  maxBodyLength: z.number().optional(),
  maxRedirects: z.number().optional(),
  maxRate: z.union([z.number(), z.tuple([z.number(), z.number()])]).optional(),
  beforeRedirect: z.function().optional(),
  socketPath: z.union([z.string(), z.null()]).optional(),
  transport: z.any().optional(),
  httpAgent: z.any().optional(),
  httpsAgent: z.any().optional(),
  proxy: z.union([z.object({}), z.boolean()]).optional(),
  cancelToken: z.any().optional(),
  decompress: z.boolean().optional(),
  transitional: z.object({}).optional(),
  signal: z.any().optional(),
  insecureHTTPParser: z.boolean().optional(),
  env: z
    .object({
      FormData: z.function().optional(),
    })
    .optional(),
  formSerializer: z.object({}).optional(),
  family: z.number().optional(),
  lookup: z.union([z.function(), z.function()]).optional(),
  withXSRFToken: z.union([z.boolean(), z.function()]).optional(),
  fetchOptions: z.object({}).optional(),
});

export const RawAxiosRequestHeadersSchema = z
  .object({
    Accept: z.string().optional(),
    'Content-Length': z.string().optional(),
    'User-Agent': z.string().optional(),
    'Content-Encoding': z.string().optional(),
    Authorization: z.string().optional(),
    'Content-Type': z
      .union([
        z.string(),
        z.literal('text/html'),
        z.literal('text/plain'),
        z.literal('multipart/form-data'),
        z.literal('application/json'),
        z.literal('application/x-www-form-urlencoded'),
        z.literal('application/octet-stream'),
      ])
      .optional(),
  })
  .partial();
