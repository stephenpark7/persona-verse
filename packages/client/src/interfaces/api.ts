import { AxiosRequestHeaders, RawAxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { TweetData, TweetPostParams } from '.';
import type { JWT } from '@shared';

export type RequestBody = 
  UsersSignupParams | 
  UsersLoginParams | 
  TweetPostParams;

export interface JsonResponse extends RefreshTokenResponse, GetTweetsResponse, PostTweetResponse {
  message: string;
}

interface RefreshTokenResponse { jwt?: JWT }
interface GetTweetsResponse { tweets?: TweetData[] }
interface PostTweetResponse { tweet?: TweetData }

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

export type ApiProtocol = 'rest' | 'trpc';