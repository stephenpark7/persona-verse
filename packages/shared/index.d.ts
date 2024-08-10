import { JWTPayload } from 'server/src/interfaces';
import { setupMiddleware } from 'server/src/middleware';
import { startServer } from 'server/src/server';

declare module 'express-session' {
  interface SessionData {
    refreshToken: JWT;
    clearSession: () => void;
  }
}

declare global {
  namespace Express {
    interface Application {
      setupMiddleware: typeof setupMiddleware;
      startServer: typeof startServer;
    }
  }
}

export {};
