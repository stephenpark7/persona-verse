import type { Express } from 'express';
import { db } from '@db';
import { app } from './app';

export const startServer = async function (this: Express) {
  app.listen(process.env.SERVER_PORT, async () => {
    await db.setup(false);
  });
};
