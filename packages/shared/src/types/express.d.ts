import { startServer } from '../../../server/src/server';
import { setupMiddleware } from '../../../server/src/middleware';
import type { Jwt } from './jwt';

// NOTE: can't correctly infer the type due to Zod, it will be any
declare module 'express-session' {
  interface SessionData {
    refreshToken: Jwt;
    clearSession: () => void;
  }
}

declare module 'express-serve-static-core' {
  interface Application {
    setupMiddleware: typeof setupMiddleware;
    startServer: typeof startServer;
  }
}
