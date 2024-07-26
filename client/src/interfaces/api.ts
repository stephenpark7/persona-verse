import { JWT } from './user';
import { TweetParams } from './tweet';
import { RequestBody } from '.';
import { NavigateFunction } from 'react-router-dom';

export interface HTTPResponse {
  message: string;
  user: JWT;
  tweet: TweetParams;
  tweets: TweetParams[];
  accessToken: JWT;
};

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
