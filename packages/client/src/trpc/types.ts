export interface RegisterUserParams {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserParams {
  username: string;
  password: string;
}

export type Response = {
  message: string;
  jwt?: {
    token: string;
    expiresAt: number;
  };
  profile?: object | null;
} | { message: string };