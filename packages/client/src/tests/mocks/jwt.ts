import { JWTSchema } from "@utils";

export const mockJwt = JWTSchema.parse({
  token: 'test_token',
  expiresAt: Date.now() + 1000,
  payload: {
    userId: 1,
    username: 'test_user',
  },
});
