import { vi } from 'vitest';
import { getDisplayName } from '@utils';
import { UserType } from '@factories';
import { userFactory } from '../factories/user';

vi.mock('@utils', () => ({
  getDisplayName: vi.fn(),
  JWTSchema: {
    parse: vi.fn(),
  },
  apiConfig: vi.fn(),
  tokenStorage: {
    getAccessToken: vi.fn(),
  },
}));

export const getDisplayNameStub = (userType: UserType = UserType.User) =>
  vi
    .mocked(getDisplayName)
    .mockReturnValueOnce(userFactory(userType).displayName);
