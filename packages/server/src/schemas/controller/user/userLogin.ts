import { UserProfile } from '@models';
import { jwt } from '@shared/schemas';
import { z } from 'zod';

export const userLoginParams = z.object({
  username: z.string(),
  password: z.string(),
});

export const userLoginResponse = z.object({
  message: z.string(),
  jwt: jwt,
  profile: z.custom<UserProfile>(),
});
