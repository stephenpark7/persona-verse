import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { initTRPC } from '@trpc/server';
import { db } from '../db';

// const createContext = ({
//   req,
//   res,
// }: trpcExpress.CreateExpressContextOptions) => ({});
// type Context = Awaited<ReturnType<typeof createContext>>;

// const t = initTRPC.context<Context>().create();

const t = initTRPC.create();

const appRouter = t.router({
  userList: t.procedure
    .query(async () => {
      const users = await db.models.User.findAll();
      return users;
    }),
});

const server = createHTTPServer({
  router: appRouter,
});

export { server, appRouter };

export type AppRouter = typeof appRouter;
