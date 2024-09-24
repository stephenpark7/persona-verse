import { userRoutes, tweetRoutes } from './routes';
import { refreshRoutes } from './routes/refresh';
import { router } from './trpc';

export const appRouter = router({
  ...userRoutes,
  ...tweetRoutes,
  ...refreshRoutes,
});

export type AppRouter = typeof appRouter;
