import React from 'react';

export interface HTTPResponse {
  message?: string;
};

export type EnhancedHTTPResponse = HTTPResponse & UserParams;

interface FormDataParams {
  username: string;
  email: string;
  password: string;
};

export interface UserParams {
  token: string;
  expiresAt: string;
  payload: JWTPayload;
};

export interface JWTPayload {
  userId: number;
  username: string;
  displayName: string;
};

export interface UserContext {
  userData: UserData;
  setUserData: SetUserData;
  isLoggedIn: boolean;
  logout: () => Promise<void>;
};

export interface PostTweetParams {
  message: string;
};

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

export type FormData = FormDataParams | null;
export type UserData = UserParams | null;
export type SetUserData = React.Dispatch<React.SetStateAction<UserData>>;
export type TweetParamsData = TweetParams[] | null;
