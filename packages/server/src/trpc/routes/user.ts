import { z } from 'zod';
import { userCreate, userLogin, userLogout } from '@controllers';
import { publicProcedure } from '../trpc';

export const userRoutes = {
  registerUser: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await userCreate(input);
    }),
  loginUser: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return await userLogin(input, ctx.req);
    }),
  logoutUser: publicProcedure.mutation(async ({ ctx }) => {
    return await userLogout(ctx.session, ctx.req, ctx.res);
  }),
};
