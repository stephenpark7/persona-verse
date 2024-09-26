import { setupMiddleware } from 'server/src/middleware';
import { startServer } from 'server/src/server';
import { Jwt } from './jwt';

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
