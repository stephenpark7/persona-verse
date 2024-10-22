import { startServer } from '../../../server/src/server';
import { setupMiddleware } from '../../../server/src/middleware';
import type { Jwt } from './jwt';

declare module 'express' {
  interface Request {
    userId?: number;
    session: SessionData;
  }
}

// NOTE: can't correctly infer the type due to Zod, it will be any
declare module 'express-session' {
  interface SessionData {
    refreshToken?: Jwt;
    clearSession: () => void;
  }
}

// declare namespace Express {
//   export interface Request {
//     session?: SessionData;
//   }
// }

declare module 'express-serve-static-core' {
  interface Application {
    setupMiddleware: typeof setupMiddleware;
    startServer: typeof startServer;
  }
}
