import {
  AxiosRequestHeaders,
  RawAxiosRequestConfig,
  RawAxiosRequestHeaders,
} from 'axios';
import type { RequestBody } from './schemas/api';

export interface ApiCall {
  method: string;
  controller: string;
  action: string;
  body?: RequestBody;
  options?: RawAxiosRequestConfig;
  headers?: RawAxiosRequestHeaders | AxiosRequestHeaders;
}
