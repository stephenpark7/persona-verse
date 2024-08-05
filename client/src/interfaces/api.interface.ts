import { AxiosRequestHeaders, RawAxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { JWT, TweetData, TweetPostParams } from './';

export type RequestBody = 
  UsersSignupParams | 
  UsersLoginParams | 
  TweetPostParams;

export interface JsonResponse extends RefreshTokenResponse, GetTweetsResponse, PostTweetResponse {
  message: string;
}

type RefreshTokenResponse = { jwt?: JWT };
type GetTweetsResponse = { tweets?: TweetData[] };
type PostTweetResponse = { tweet?: TweetData };

export interface ApiCall {
  method: string,
  controller: string,
  action: string,
  body?: RequestBody,
  options?: RawAxiosRequestConfig,
  headers?: RawAxiosRequestHeaders | AxiosRequestHeaders,
}

export interface UsersSignupParams {
  username: string;
  email: string;
  password: string;
}

export interface UsersLoginParams {
  username: string;
  password: string;
}
