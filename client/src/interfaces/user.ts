import { TweetData } from './api';

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

export type JWT = {
  token: string;
  expiresAt: string;
  payload: JWTPayload;
};

export type JWTPayload = {
  userId: number;
  username: string;
  displayName: string;
};
