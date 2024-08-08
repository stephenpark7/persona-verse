import { Express } from 'express';
import { app } from './app';
import { db } from './db';

export const startServer = async function (this: Express) {
  app.listen(process.env.SERVER_PORT, async () => {
    console.log('Express server started at port ' + process.env.SERVER_PORT);
    await db.setupDatabase();
  });
};
