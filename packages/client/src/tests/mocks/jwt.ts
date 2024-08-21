import { JWTSchema } from "@utils";

export const mockJwt = JWTSchema.parse({
  token: 'token',
  expiresAt: Date.now() + 1000,
  payload: {
    userId: 1,
    username: 'user',
  },
});
