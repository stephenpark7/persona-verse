import type { CreateContextParams } from '@shared/types';
import { isAuthHeaderRequired, extractAuthTokenFromRequest } from '@utils';
import { User } from '@db/models';
import { Jwt } from '@models';

export const createContext = async ({ req, res }: CreateContextParams) => {
  const context = { req, res };

  if (isAuthHeaderRequired(context.req)) {
    const token = extractAuthTokenFromRequest(context.req);

    const { userId } = await Jwt.decode(token);

    await User.findById(userId);

    context.req.userId = userId;
  }

  return context;
};

export type Context = Awaited<ReturnType<typeof createContext>>;
