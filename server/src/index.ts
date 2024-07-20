import express from 'express';
import ENV from './utils/env';
import { cors, cookies, router } from './middleware';

const app = express();
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies);
app.use('/', router);

if (process.env.NODE_ENV === 'development') {
  app.listen(ENV.SERVER_PORT, () => {
    console.log('Server started at port ' + ENV.SERVER_PORT);
  });
}

export default app;
