import { AuthenticatedRequest } from '@shared/types';
import { userCreate, userLogin, userLogout } from '@controllers';
import { publicProcedure } from '../trpc';
import { z } from 'zod';

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
      return await userLogin(input, ctx.req as unknown as AuthenticatedRequest);
    }),
  logoutUser: publicProcedure.mutation(async ({ ctx }) => {
    await userLogout(ctx.req);
    ctx.session.destroy((err: Error) => {
      if (err) {
        console.error('Error while destroying session: ', err);
        return { message: 'Error while logging out.' };
      }
    });
    ctx.res.clearCookie('pv-session', { path: '/' });
    return { message: 'Successfully logged out.' };
  }),
};
