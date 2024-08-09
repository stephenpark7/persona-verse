import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { JsonResponse, ApiCall } from '../interfaces';
import { BASE_API_URL } from '../utils';

export const apiUrl = (controller: string, action: string): string => {
  if (!BASE_API_URL || !controller || action === undefined) {
    throw new Error(`Invalid API URL: ${BASE_API_URL}${controller}${action}`);
  }
  return `${BASE_API_URL}${controller}/${action}`;
};

export const sendHttpRequest = async (params: ApiCall): Promise<JsonResponse> =>{
  const { method, controller, action, body, options, headers } = params;

  const config: AxiosRequestConfig = {
    url: apiUrl(controller, action),
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
