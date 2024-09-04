import type { JWT } from '@shared';

export interface PostTweet {
  jwt: JWT | null;
  payload: TweetPostParams;
}

export interface TweetPostParams {
  message: string;
}
