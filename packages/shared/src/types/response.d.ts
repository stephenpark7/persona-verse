import { z } from 'zod';
import { refreshTokenResponse, jsonResponse } from '@shared/schemas';

export type RefreshTokenResponse = z.infer<typeof refreshTokenResponse>;

export type JsonResponse = z.infer<typeof jsonResponse>;
