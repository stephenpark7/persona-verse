import type { Response } from 'express';
import type { Session } from 'express-session';
import type { AuthenticatedRequest } from '@shared/types';
import { User } from '@models';

export const userLogout = async (
  session: Session,
  req: AuthenticatedRequest,
  res: Response,
) => {
  return await User.logoutAccount(session, req, res);
};
