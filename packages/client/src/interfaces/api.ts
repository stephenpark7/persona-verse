import {
  AxiosRequestHeaders,
  RawAxiosRequestConfig,
  RawAxiosRequestHeaders,
} from 'axios';
import { TweetPostData } from './schemas/tweet';
import type { UserSignupData, UserLoginData } from './schemas/api';

export type RequestBody = UserSignupData | UserLoginData | TweetPostData;

export interface ApiCall {
  method: string;
  controller: string;
  action: string;
  body?: RequestBody;
  options?: RawAxiosRequestConfig;
  headers?: RawAxiosRequestHeaders | AxiosRequestHeaders;
}
