import { refreshJwt } from '@controllers';
import { publicProcedure } from '../trpc';

export const refreshRoutes = {
  refreshJwt: publicProcedure.mutation(async ({ ctx }) => {
    return await refreshJwt(ctx.req);
  }),
};
