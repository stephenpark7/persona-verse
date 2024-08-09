import { create, login } from '../controllers/user.controller';
import { router, publicProcedure } from './trpc';
import { z } from 'zod';

export const appRouter = router({
  registerUser: publicProcedure
    .input(z.object({
      username: z.string(),
      email: z.string(),
      password: z.string()
    }))
    .mutation(async ({ input }) => {
      const user = create(input);
      return user;
    }),
  loginUser: publicProcedure
    .input(z.object({
      username: z.string(),
      password: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
      const user = login(input, ctx.req);
      // TODO: need req.session
      // that's what createcontext is for
      return user;
    }),
  // .mutation(async (
  // userList: t.procedure
  //   .query(async () => {
  //     const users = await db.models.User.findAll();
  //     return users;
  //   }),
});

export type AppRouter = typeof appRouter;
