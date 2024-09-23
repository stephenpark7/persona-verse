import { userRoutes, tweetRoutes } from './routes';
import { router } from './trpc';

export const appRouter = router({
  ...userRoutes,
  ...tweetRoutes,
});

export type AppRouter = typeof appRouter;
