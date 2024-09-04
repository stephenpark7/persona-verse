import {
  AxiosRequestHeaders,
  RawAxiosRequestConfig,
  RawAxiosRequestHeaders,
} from 'axios';
import { TweetData, TweetPostData } from './schemas/tweet';
import type {
  RefreshTokenResponse,
  UserSignupData,
  UserLoginData,
} from './schemas/api';

export type RequestBody = UserSignupData | UserLoginData | TweetPostData;

export interface JsonResponse
  extends RefreshTokenResponse,
    GetTweetsResponse,
    PostTweetResponse {
  message: string;
}

interface GetTweetsResponse {
  tweets?: TweetData[];
}
interface PostTweetResponse {
  tweet?: TweetData;
}

export interface ApiCall {
  method: string;
  controller: string;
  action: string;
  body?: RequestBody;
  options?: RawAxiosRequestConfig;
  headers?: RawAxiosRequestHeaders | AxiosRequestHeaders;
}

export type ApiProtocol = 'rest' | 'trpc';
