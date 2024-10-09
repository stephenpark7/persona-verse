import { tweetCreate, tweetGet } from '@controllers';
import { publicProcedure } from '../trpc';
import { z } from 'zod';
import { AuthenticatedRequest } from '@shared/types';

export const tweetRoutes = {
  createTweet: publicProcedure
    .input(
      z.object({
        message: z.string(),
      }),
    )
    .mutation(async ({ ctx }) => {
      return await tweetCreate(ctx.req as unknown as AuthenticatedRequest);
    }),
  getTweets: publicProcedure.query(async ({ ctx }) => {
    return await tweetGet(ctx.req as unknown as AuthenticatedRequest);
  }),
};
