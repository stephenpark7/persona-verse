import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { publicProcedure, router } from './trpc';
import { db } from '../db';

const AppRouter = router({
  userList: publicProcedure
    .query(async () => {
      // Retrieve users from a datasource, this is an imaginary database
      const users = await db.models.User.findAll();
      return users;
    }),
});

const server = createHTTPServer({
  router: AppRouter,
});
 
server.listen(3000);

export type AppRouter = typeof AppRouter;
