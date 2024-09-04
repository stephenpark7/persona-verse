import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from 'axios';
import { JsonResponse, ApiCall } from '@interfaces';
import { apiConfig } from '@utils';

export const sendHttpRequest = async (
  params: ApiCall,
): Promise<JsonResponse> => {
  const { method, controller, action, body, options, headers } = params;

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
