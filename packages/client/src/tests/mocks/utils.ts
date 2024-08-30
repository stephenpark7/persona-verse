import { vi } from 'vitest';
import { getDisplayName } from '@utils';

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

export const getDisplayNameStub = vi
  .mocked(getDisplayName)
  .mockReturnValue('John Doe');
