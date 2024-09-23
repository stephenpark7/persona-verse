import { tweetCreate, tweetGet } from '@controllers';
import { publicProcedure } from '../trpc';
import { z } from 'zod';

export const tweetRoutes = {
  createTweet: publicProcedure
    .input(z.object({
      message: z.string(),
    }))
    .mutation(async ({ ctx }) => {
      const tweet = await tweetCreate(ctx.req);
      return tweet;
    }),
  getTweets: publicProcedure
    .query(async ({ ctx }) => {
      const tweets = await tweetGet(ctx.req);
      return tweets;
    }),
};
