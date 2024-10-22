import { createTweet, getTweets } from '@controllers';
import { publicProcedure } from '../trpc';
import { z } from 'zod';

export const tweetRoutes = {
  createTweet: publicProcedure
    .input(
      z.object({
        message: z.string(),
      }),
    )
    .mutation(async ({ ctx }) => {
      return await createTweet(ctx.req);
    }),
  getTweets: publicProcedure.query(async ({ ctx }) => {
    return await getTweets(ctx.req);
  }),
};
