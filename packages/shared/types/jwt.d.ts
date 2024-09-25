import { z } from 'zod';
import { jwtSchema } from './jwt';
import { tweetSchema } from './tweet';

export const refreshTokenResponse = z.object({
  jwt: jwtSchema,
});

export const getTweetsResponse = z.object({
  tweets: z.array(tweetSchema),
});

export const postTweetResponse = z.object({
  tweet: tweetSchema,
});

export const jsonResponse = z
  .object({
    message: z.string(),
  })
  .extend(refreshTokenResponse.partial().shape)
  .extend(getTweetsResponse.partial().shape)
  .extend(postTweetResponse.partial().shape);

export type RefreshTokenResponse = z.infer<typeof refreshTokenResponse>;
export type JsonResponse = z.infer<typeof jsonResponse>;

//

export const jwt = z.object({
  token: z.string(),
  expiresAt: z.number(),
  payload: jwtPayload,
});

export type Jwt = z.infer<typeof jwt>;

export const jwtPayload = z.object({
  userId: z.number(),
  username: z.string(),
  expiresAt: z.number().optional(),
  jti: z.string().optional(),
});

export type JwtPayload = z.infer<typeof jwtPayload>;

//

export const request = z.custom<Request>();

export type Request = z.infer<typeof request>;

export const authenticatedRequest = request.extend({
  token: z.string(),
  userId: z.number(),
});

export type AuthenticatedRequest = z.infer<typeof authenticatedRequest>;
