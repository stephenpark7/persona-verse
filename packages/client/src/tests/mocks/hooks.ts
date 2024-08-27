import { vi } from 'vitest';

vi.mock('@hooks', () => ({
  useUserState: vi.fn(),
}));
