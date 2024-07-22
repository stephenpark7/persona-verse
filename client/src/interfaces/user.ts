import { NavigateFunction } from 'react-router-dom';
import { UserData, SetUserData } from './index';

export interface UserContext {
  userData: UserData;
  setUserData: SetUserData;
  isLoggedIn: boolean;
  logout: (navigate: NavigateFunction) => Promise<void>;
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
