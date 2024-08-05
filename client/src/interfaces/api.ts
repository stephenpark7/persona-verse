import { JWT } from './user';
import { RequestBody } from '.';
import { NavigateFunction } from 'react-router-dom';
import { AxiosRequestHeaders, RawAxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

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

export interface RegisterParams {
  formData: RequestBody,
  navigate: NavigateFunction,
  showToast?: boolean | undefined,
  autoLogin?: boolean | undefined,
}

export type RegisterFunction = (params: RegisterParams) => Promise<void>;

export interface Login {
  formData: RequestBody,
  navigate: NavigateFunction,
  showToast?: boolean | undefined,
}

export interface PostTweet {
  jwt: JWT | null,
  payload: TweetPostParams,
}

export interface TweetData extends Iterable<TweetData> {
  [Symbol.iterator](): IterableIterator<TweetData>;
  id?: number;
  message: string;
  createdAt: string;
  User: {
    username: string;
    displayName: string;
  }
}

export interface SubmitForm {
  e: React.FormEvent<HTMLFormElement>,
  formData: RequestBody,
  apiFunction: ApiFunction,
  navigate: NavigateFunction,
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

export interface TweetPostParams {
  message: string;
}

type ApiFunction = ({ ...args }: RegisterParams | Login) => Promise<void>;
