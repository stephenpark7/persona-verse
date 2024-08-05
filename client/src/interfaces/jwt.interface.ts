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
