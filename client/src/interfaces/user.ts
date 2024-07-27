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
  value: State | null;
};

export type State = {
  jwt: JWT;
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
