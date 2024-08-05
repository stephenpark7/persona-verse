import { app } from './app';
import { db } from './db';

app.listen(process.env.SERVER_PORT, async () => {
  console.log('Server started at port ' + process.env.SERVER_PORT);
  await db.setupDB();
});
