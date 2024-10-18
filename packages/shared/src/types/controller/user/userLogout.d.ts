import { z } from 'zod';
import { userLogoutResponse } from '@schemas';

export type UserLogoutResponse = z.infer<typeof userLogoutResponse>;
