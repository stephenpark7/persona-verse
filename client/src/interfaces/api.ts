import { JWT } from './user';
import { TweetParams } from './tweet';
import { RequestBody } from '.';
import { NavigateFunction } from 'react-router-dom';

export interface JsonResponse {
  message: string;
  jwt: JWT;
  tweet: TweetParams;
  tweets: TweetParams[];
};

export interface ApiCall {
  method: string,
  controller: string,
  action: string,
  body: RequestBody,
  options?: RequestInit,
  headers?: Record<string, string>,
}

//

export interface Register {
  formData: RequestBody,
  navigate: NavigateFunction,
  showToast: boolean,
  autoLogin: boolean,
}

//



export interface UsersSignupParams {
  username: string;
  email: string;
  password: string;
};

export interface UsersLoginParams {
  username: string;
  password: string;
};

export interface TweetPostParams {
  message: string;
};

export interface APIFunction {
  (formData: RequestBody, navigate: NavigateFunction, showToast?: boolean, autoLogin?: boolean): Promise<void>;
};

//

// expot interface RequestURL {
  