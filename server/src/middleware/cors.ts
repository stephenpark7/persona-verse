import cors from 'cors';

const corsMiddleware = () => cors({
  origin: [
    `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
  ],
  methods: [ 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD' ],
  allowedHeaders: [ 'Content-Type', 'Authorization' ],
  credentials: true,
});

export { corsMiddleware };
