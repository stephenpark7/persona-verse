import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from 'server/src/trpc';
import { JsonResponse } from '../interfaces';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3001/trpc',
    }),
  ],
});

export interface RegisterUserParams {
  username: string;
  email: string;
  password: string;
}

const registerUser = async ({
  username,
  email,
  password,
}: RegisterUserParams): Promise<JsonResponse> => {
  return await trpc.registerUser.mutate({ username, email, password });
};

// Inferred types
// const getUsers = async () => {
//   return await trpc.userList.query();
// };

// const createdUser = await trpc.userCreate.mutate({ name: 'foo' });

export { registerUser };
