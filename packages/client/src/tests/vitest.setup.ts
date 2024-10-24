import '@testing-library/jest-dom/vitest';
import '@tests/matchers';
import { createTRPCMsw } from 'msw-trpc';
import { setupServer } from 'msw/node';
import type { AppRouter } from 'server/src/trpc';

const mswTrpc = createTRPCMsw<AppRouter>();

type MswTrpc = typeof mswTrpc;

const setupServerWithQueries = (mswTrpc: MswTrpc) => {
  return setupServer(
    mswTrpc.registerUser.mutation((name) => {
      return { id: '1', name };
    }),
    mswTrpc.loginUser.mutation((name) => {
      return { id: '1', name };
    }),
    mswTrpc.logoutUser.mutation(() => {
      return { message: 'Successfully logged out.' };
    }),
    mswTrpc.refreshJwt.mutation(() => {
      return { message: 'Token refreshed.', jwt: 'test123' };
    }),
    mswTrpc.createTweet.mutation((message) => {
      return { id: '1', message };
    }),
    mswTrpc.getTweets.query(() => {
      return { tweets: [{ id: '1', message: 'Hello, world!' }] };
    }),
  );
};

const server = setupServerWithQueries(mswTrpc);

beforeAll(() => server.listen());

afterAll(() => server.close());
