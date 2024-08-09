import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  return {
    session: req.session,
    req,
    res,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
