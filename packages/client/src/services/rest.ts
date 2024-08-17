import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { JsonResponse, ApiCall } from '@interfaces/index';
import { apiConfig } from '@utils/index';

export const sendHttpRequest = async (params: ApiCall): Promise<JsonResponse> =>{
  const { method, controller, action, body, options, headers } = params;

  const config: AxiosRequestConfig = {
    url: apiConfig.urlWithParams(controller, action),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    } as RawAxiosRequestHeaders,
    method,
    data: body,
    ...options,
  };

  const response: AxiosResponse = await axios.request(config);

  return response.data;
};
