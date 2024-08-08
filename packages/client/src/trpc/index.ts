import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'server/src/trpc';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3001/trpc',
    }),
  ],
});

// Inferred types
const getUsers = async () => {
  return await trpc.userList.query();
};

// const createdUser = await trpc.userCreate.mutate({ name: 'foo' });

export { trpc, getUsers };
