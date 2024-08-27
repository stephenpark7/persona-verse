import { vi } from 'vitest';

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
