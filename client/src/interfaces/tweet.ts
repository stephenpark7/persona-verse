export interface TweetParams extends Iterable<TweetParams> {
  [Symbol.iterator](): IterableIterator<TweetParams>;
  id?: number;
  message: string;
  createdAt: string;
  User: {
    username: string;
    displayName: string;
  };
};

