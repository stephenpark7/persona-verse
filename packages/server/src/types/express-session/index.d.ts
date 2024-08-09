import { JWTPayload } from '../interfaces';

declare module 'express-session' {
  interface SessionData {
    refreshToken: JWTPayload;
    clearSession: () => void;
  }
}

export { };
