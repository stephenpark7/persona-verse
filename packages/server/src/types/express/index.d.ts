import { setupMiddleware } from '../../middleware';

declare global {
  namespace Express {
    interface Application {
      setupMiddleware: typeof setupMiddleware;
    }
  }
}

export {};
