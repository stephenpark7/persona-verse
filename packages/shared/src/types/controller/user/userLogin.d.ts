import { z } from 'zod';
import { userLoginParams, userLoginResponse } from '@shared/schemas';

export type UserLoginParams = z.infer<typeof userLoginParams>;

export type UserLoginResponse = z.infer<typeof userLoginResponse>;
