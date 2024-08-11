// import { JWTPayload } from 'server/src/interfaces';
import { setupMiddleware } from 'server/src/middleware';
import { startServer } from 'server/src/server';

declare module 'express-session' {
  interface SessionData {
    refreshToken: JWT;
    clearSession: () => void;
  }
}


declare module 'express-serve-static-core' {
  interface Application {
    setupMiddleware: typeof setupMiddleware;
    startServer: typeof startServer;
  }
}

export type JWT = {
  token: string;
  expiresAt: number;
  payload: JWTPayload;
};
export type JWTPayload = {
  userId: number;
  username: string;
  expiresAt?: number;
  jti?: string;
};
