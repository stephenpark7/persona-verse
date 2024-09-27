import { z } from 'zod';

export type RefreshTokenResponse = z.infer<typeof refreshTokenResponse>;
export type JsonResponse = z.infer<typeof jsonResponse>;
