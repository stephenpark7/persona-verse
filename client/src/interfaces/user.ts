export type JWT = null | {
  token: string;
  expiresAt: string;
  payload: JWTPayload;
};

export type JWTWrapper = {
  jwt: {
    user: JWT;
  }
};
export interface JWTPayload {
  userId: number;
  username: string;
  displayName: string;
};
