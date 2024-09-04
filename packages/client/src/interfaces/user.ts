import { TweetProps } from '.';
import type { JWT } from '@shared';

export interface User {
  state: State;
}

export interface State {
  value: StateProperties;
}

export interface StateProperties {
  jwt: JWT | null;
  tweets: TweetProps[] | null;
}
