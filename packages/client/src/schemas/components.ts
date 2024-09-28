import { z } from 'zod';
import { jwtSchema } from './jwt';

export const contentSectionProps = z.object({
  jwt: jwtSchema.nullable(),
  isLoggedIn: z.boolean(),
});
