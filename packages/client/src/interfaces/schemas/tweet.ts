import { z } from 'zod';

export const TweetAPISchema = z.object({
  queries: z.record(z.object({})),
  mutations: z.record(z.object({})),
  provided: z.record(z.object({})),
  subscriptions: z.record(z.object({})),
  config: z.object({
    reducerPath: z.string(),
    online: z.boolean(),
    focused: z.boolean(),
    middlewareRegistered: z.boolean(),
    refetchOnMountOrArgChange: z.boolean(),
    refetchOnReconnect: z.boolean(),
    refetchOnFocus: z.boolean(),
    keepUnusedDataFor: z.number(),
    invalidationBehavior: z.string(),
  }),
});
