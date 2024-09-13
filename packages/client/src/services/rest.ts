import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from 'axios';
import { JsonResponse, HttpRequestParams, httpRequestParams } from '@schemas';
import { apiConfig } from '@utils';

export const sendHttpRequest = async (
  params: HttpRequestParams,
): Promise<JsonResponse> => {
  const { method, controller, action, options, body, headers } = params;

  httpRequestParams.parse(params);

  const config = {
    url: apiConfig.urlWithParams(controller, action),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    } as RawAxiosRequestHeaders,
    method,
    data: body,
    ...options,
  } as AxiosRequestConfig<JsonResponse>;

  const response: AxiosResponse = await axios.request(config);

  return response.data;
};
