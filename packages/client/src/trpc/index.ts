import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
// TODO: Import AppRouter from server/src/trpc
// using npm workspaces
// npm workspaces are a feature of npm that allows you to manage multiple packages within a single top-level, root package.
// This is useful when you have multiple packages that depend on each other.

// have to add tsconfig to root
// then use extends in the tsconfig of the client and server

// however client and server may have different versions for their dependencies
// so it needs to be troubleshooted if there are any issues

import type { AppRouter } from 'server/src/trpc';
//     👆 **type-only** import

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000',
    }),
  ],
});
