import express from 'express';
import ENV from './utils/env';
import middleware from './middlewares';

const app = express();

app.use(middleware.cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware.cookies);

app.use('/', middleware.router);

app.listen(ENV.SERVER_PORT, () => {
  console.log('Server started at port ' + ENV.SERVER_PORT);
});
