import type { Response } from 'express';
import type { Session } from 'express-session';
import type { Request } from 'express';
import { User } from '@db/models';
// import { TRPCError } from '@trpc/server';
// import { ZodError } from 'zod';

export const userLogout = async (
  session: Session,
  req: Request,
  res: Response,
) => {
  // try {
  return await User.logoutAccount(session, req, res);
  // } catch (err) {
  //   let message;

  //   if (err instanceof ZodError) {
  //     // message =
  //     //   err.errors[0].code +
  //     //   ': ' +
  //     //   err.errors[0].message +
  //     //   err.errors[0].path +
  //     //   err.errors[0].fatal;
  //     message = err.errors[0].message;
  //   }

  //   throw new TRPCError({
  //     code: 'INTERNAL_SERVER_ERROR',
  //     message,
  //     cause: err,
  //   });
  // }
};
