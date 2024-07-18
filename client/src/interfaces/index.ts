
import React from 'react';
export interface FormData {
  username: string;
  email: string;
  password: string;
};

export interface User {
  token: string;
  expiresAt: string;
  payload: JWTPayload;
};

export interface JWTPayload {
  userId: number;
  username: string;
};

export interface UserContext {
  userData: UserData;
  setUserData: SetUserData;
  isLoggedIn: boolean;
  logout: () => Promise<void>;
};

export type UserData = User | null;
export type SetUserData = React.Dispatch<React.SetStateAction<UserData>>;
