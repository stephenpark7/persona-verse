import { z } from 'zod';
import { userLogoutResponse } from '@shared/schemas';

export type UserLogoutResponse = z.infer<typeof userLogoutResponse>;
