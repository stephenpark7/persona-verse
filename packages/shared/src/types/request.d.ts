import { z } from 'zod';
import { request, authenticatedRequest } from '../schemas';

export type Request = z.infer<typeof request>;

export type AuthenticatedRequest = z.infer<typeof authenticatedRequest>;
