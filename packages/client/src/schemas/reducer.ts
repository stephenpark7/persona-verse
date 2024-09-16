import { z } from 'zod';
import { userState } from './user';
import { browserState } from './browser';

export const reducer = z.object({
  user: userState,
  browser: browserState,
});

export type Reducer = z.infer<typeof reducer>;
