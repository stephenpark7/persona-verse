export interface FormData {
  username: string;
  email: string;
  password: string;
};

export interface User {
  username: string;
  email: string;
  expiresAt: string;
  token: string;
}

export interface UserContext {
  userData: UserData;
  setUserData: SetUserData;
  isLoggedIn: boolean;
  logout: () => Promise<void>;
};

export type UserData = User | null;
export type SetUserData = React.Dispatch<React.SetStateAction<User | null>>;

