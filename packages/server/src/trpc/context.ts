import type { CreateContextParams } from '@shared/types';
import { isAuthHeaderRequired, extractAuthTokenFromRequest } from '@utils';
import { User } from '@db/models';
import { Jwt } from '@models';

export const createContext = async ({ req, res }: CreateContextParams) => {
  if (isAuthHeaderRequired(req)) {
    const token = extractAuthTokenFromRequest(req);

    const { userId } = await Jwt.decode(token);

    await User.findById(userId);

    req.userId = userId;
  }

  return {
    req,
    res,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
