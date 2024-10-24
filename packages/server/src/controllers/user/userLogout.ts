import type { Request, Response } from 'express';
// import type { Session } from 'express-session';
import { User } from '@db/models';

export const userLogout = async (
  // session: Session,
  req: Request,
  res: Response,
) => {
  return await User.logoutAccount(req, res);
};
