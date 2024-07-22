import { UserParams } from './user';
import { TweetParams } from './tweet';

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
