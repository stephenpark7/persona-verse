import { JWT } from './user';
import { RequestBody } from '.';
import { NavigateFunction } from 'react-router-dom';
import { AxiosRequestHeaders, RawAxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

// export interface JsonResponse
//          extends RefreshTokenResponse,
//                  GetTweetsResponse,
//                  PostTweetResponse {
//   message: string;
// };

export interface JsonResponse {
  message: string;
  jwt?: JWT;
  tweets?: TweetData[];
  tweet?: TweetData;
}

export interface RefreshTokenResponse {
  jwt?: JWT;
}

export interface GetTweetsResponse {
  tweets?: TweetData[];
}

export interface PostTweetResponse {
  tweet?: TweetData;
}

export interface ApiCall {
  method: string,
  controller: string,
  action: string,
  body?: RequestBody,
  options?: RawAxiosRequestConfig,
  headers?: RawAxiosRequestHeaders | AxiosRequestHeaders,
}

//

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

export type SetTweetData = React.Dispatch<React.SetStateAction<TweetData[]>>;

export interface PostTweet {
  jwt: JWT | null,
  payload: TweetPostParams,
}

export type TweetData = {
  // extends Iterable<TweetData>
  [Symbol.iterator](): IterableIterator<TweetData>;
  id?: number;
  message: string;
  createdAt: string;
  User: {
    username: string;
    displayName: string;
  }
}

//

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

export type ApiFunction = ({ ...args }: RegisterParams | Login) => Promise<void>;

export type ApiCallback = (params: ApiCall) => Promise<void>;
