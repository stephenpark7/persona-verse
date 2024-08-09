import { create, login, logout } from '../controllers/user.controller';
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
      const user = await create(input);
      return user;
    }),
  loginUser: publicProcedure
    .input(z.object({
      username: z.string(),
      password: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const user = await login(input, ctx.req);
      console.log('user: ', user);
      return user;
    }),
  logoutUser: publicProcedure
    .mutation(async ({ ctx }) => {
      await logout(ctx.req, ctx.res);
      return { message: 'Successfully logged out' };
    }),
});

export type AppRouter = typeof appRouter;
