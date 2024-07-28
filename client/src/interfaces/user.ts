// export type JWT = null | {
//   token: string;
//   expiresAt: string;
//   payload: JWTPayload;
// };

// export type JWTWrapper = {
//   jwt: {
//     user: JWT;
//   }
// };
// export interface JWTPayload {
//   userId: number;
//   username: string;
//   displayName: string;
// };

// export interface JWTStore {
//   jwt: JWT;
// };

export type User = {
  state: State;
};

export type State = {
  value: StateProperties;
};

export type StateProperties = {
  jwt: JWT | null;
  history: History | null;
};

export type History = {
  [key: string]: string;
};

// export type State = {
//   jwt: JWT | null;
// };

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
