import { db } from '../db';
import { t } from './trpc';

export const appRouter = t.router({
  userList: t.procedure
    .query(async () => {
      const users = await db.models.User.findAll();
      return users;
    }),
});

export type AppRouter = typeof appRouter;
