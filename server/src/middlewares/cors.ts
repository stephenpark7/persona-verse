import { Request, Response, NextFunction } from "express";

const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
};

export default corsMiddleware;
