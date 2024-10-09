import { initTRPC } from '@trpc/server';
import { createTRPCMsw } from 'msw-trpc';
import { Context } from './context';
import { AppRouter } from './router';

const t = initTRPC.context<Context>().create();

export const router = t.router;

export const publicProcedure = t.procedure;

export const trpcMsw = createTRPCMsw<AppRouter>();
