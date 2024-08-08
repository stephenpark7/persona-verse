import { db } from '../db';
import { context } from './context';

const appRouter = context.router({
  userList: context.procedure
    .query(async () => {
      const users = await db.models.User.findAll();
      return users;
    }),
});

export { appRouter };

export type AppRouter = typeof appRouter;
