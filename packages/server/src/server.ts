import { app } from './app';
import { db } from './db';

const startServer = async () => {
  app.listen(process.env.SERVER_PORT, async () => {
    console.log('Express server started at port ' + process.env.SERVER_PORT);
    await db.setupDatabase();
  });
};

export { startServer };
