import { JWT, TweetData } from './';

export type User = {
  state: State;
};

export type State = {
  value: StateProperties;
};

export type StateProperties = {
  jwt: JWT | null;
  tweets: TweetData[] | null;
};
