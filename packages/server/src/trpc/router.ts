import { t } from './trpc';
import { db } from '../db';

export const appRouter = t.router({
  userList: t.procedure
    .query(async () => {
      const users = await db.models.User.findAll();
      return users;
    }),
});

export type AppRouter = typeof appRouter;
