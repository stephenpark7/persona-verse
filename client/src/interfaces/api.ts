import { UserParams } from './user';
import { TweetParams } from './tweet';
import { RequestBody, SetUserData } from '.';
import { NavigateFunction } from 'react-router-dom';

export interface HTTPResponse {
  message: string;
  user: UserParams;
  tweet: TweetParams;
  tweets: TweetParams[];
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
  (formData: RequestBody, setUserData: SetUserData, navigate: NavigateFunction, showToast?: boolean, autoLogin?: boolean): Promise<void>;
};
