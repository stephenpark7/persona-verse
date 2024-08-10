export type JWT = {
  token: string;
  expiresAt: number;
  payload: JWTPayload;
};

export type JWTPayload = {
  userId: number;
  username: string;
};
