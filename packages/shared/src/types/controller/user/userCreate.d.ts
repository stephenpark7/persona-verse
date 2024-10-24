import { z } from 'zod';
import {
  userCreateParams,
  userCreateResponse,
  userCreateSchema,
} from '@shared/schemas';

export type UserCreateParams = z.infer<typeof userCreateParams>;

export type UserCreateResponse = z.infer<typeof userCreateResponse>;

export type UserCreateSchema = z.infer<typeof userCreateSchema>;
