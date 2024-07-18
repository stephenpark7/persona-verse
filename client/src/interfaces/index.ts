import React from 'react';

interface FormDataParams {
  username: string;
  email: string;
  password: string;
};

interface UserParams {
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

export type FormData = FormDataParams | null;
export type UserData = UserParams | null;
export type SetUserData = React.Dispatch<React.SetStateAction<UserData>>;
