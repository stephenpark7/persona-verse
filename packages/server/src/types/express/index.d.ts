import { setupMiddleware } from '../../middleware';
import { startServer } from '../../server';

declare global {
  namespace Express {
    interface Application {
      setupMiddleware: typeof setupMiddleware;
      startServer: typeof startServer;
    }
  }
}

export {};
