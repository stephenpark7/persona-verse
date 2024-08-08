import cors from 'cors';

export const corsMiddleware = () => cors({
  origin: [
    `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
    `https://${process.env.CLIENT_HOST}:3001`,
    `https://${process.env.CLIENT_HOST}:3002`,
  ],
  methods: [ 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD' ],
  allowedHeaders: [ 'Content-Type', 'Authorization' ],
  credentials: true,
});
