import type { JWT } from '@shared';

export interface PostTweet {
  jwt: JWT | null;
  payload: TweetPostParams;
}

export interface TweetPostParams {
  message: string;
}

export interface TweetData extends Iterable<TweetData> {
  [Symbol.iterator](): IterableIterator<TweetData>;
  id?: number;
  message: string;
  createdAt: string;
  User: {
    username: string;
  };
}
