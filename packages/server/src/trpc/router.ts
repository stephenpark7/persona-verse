import { userCreate, userLogin, userLogout } from 'src/controllers';
import { router, publicProcedure } from './trpc';
import { z } from 'zod';

export const appRouter = router({
  registerUser: publicProcedure
    .input(z.object({
      username: z.string(),
      email: z.string(),
      password: z.string(),
    }))
    .mutation(async ({ input }) => {
      const user = await userCreate(input);
      return user;
    }),
  loginUser: publicProcedure
    .input(z.object({
      username: z.string(),
      password: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const user = await userLogin(input, ctx.req);
      return user;
    }),
  logoutUser: publicProcedure
    .mutation(async ({ ctx }) => {
      await userLogout(ctx.req);
      ctx.session.destroy((err: Error) => {
        if (err) {
          console.error('Error while destroying session: ', err);
        }
      });
      ctx.res.clearCookie('pv-session', { path: '/' });
      return { message: 'Successfully logged out' };
    }),
});

export type AppRouter = typeof appRouter;
