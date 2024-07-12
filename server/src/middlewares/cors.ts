import { Request, Response, NextFunction } from "express";

const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`);
  console.log(`http://${process.env.DB_HOST}:${process.env.CLIENT_PORT}`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
};

export default corsMiddleware;
