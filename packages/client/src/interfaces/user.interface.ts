import { TweetData } from './';
import type { JWT } from 'shared/types';

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
