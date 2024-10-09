import type { AuthenticatedRequest } from '@shared/types';

export const authenticatedRequestFactory = (
  override = {},
): AuthenticatedRequest => {
  return {
    ...override,
  } as AuthenticatedRequest;
};
