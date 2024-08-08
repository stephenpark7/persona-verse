import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { publicProcedure, router } from './trpc';
import { db } from '../db';

const AppRouter = router({
  userList: publicProcedure
    .query(async () => {
      const users = await db.models.User.findAll();
      return users;
    }),
});

const server = createHTTPServer({
  router: AppRouter,
});

export { server };

export type AppRouter = typeof AppRouter;
