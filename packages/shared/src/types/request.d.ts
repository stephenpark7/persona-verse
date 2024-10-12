import { z } from 'zod';
import {
  request,
  authenticatedRequest,
  userCreateParams,
  userLoginParams,
} from '../schemas';

export type Request = z.infer<typeof request>;

export type AuthenticatedRequest = z.infer<typeof authenticatedRequest>;

export type UserCreateParams = z.infer<typeof userCreateParams>;

export type UserLoginParams = z.infer<typeof userLoginParams>;
