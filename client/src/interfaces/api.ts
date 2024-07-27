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
  showToast?: boolean | undefined,
  autoLogin?: boolean | undefined,
}

export interface Login {
  formData: RequestBody,
  navigate: NavigateFunction,
  showToast?: boolean | undefined,
}

export interface GetTweets {
  userData: JWT,
  setTweetData: React.Dispatch<React.SetStateAction<TweetParams[]>>,
}

export interface PostTweet {
  userData: JWT,
  payload: TweetPostParams,
  tweetData: TweetParams[],
  setTweetData: React.Dispatch<React.SetStateAction<TweetParams[]>>,
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
};

export interface UsersLoginParams {
  username: string;
  password: string;
};

export interface TweetPostParams {
  message: string;
};

export type ApiFunction = ({ ...args }: Register | Login) => Promise<void>;

export type ApiCallback = (params: ApiCall) => Promise<void>;
