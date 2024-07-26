export type JWT = null | {
  token: string;
  expiresAt: string;
  payload: JWTPayload;
};

export type JWTWrapper = {
  jwt: {
    value: JWT;
  }
};
export interface JWTPayload {
  userId: number;
  username: string;
  displayName: string;
};
