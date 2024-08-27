import { vi } from 'vitest';
import { useUserState } from '@hooks';
import { useUserStateFactory } from '@factories';

vi.mock('@hooks', () => ({
  useUserState: vi.fn(),
}));

export const useUserStateStub = vi.mocked(useUserState).mockReturnValue(useUserStateFactory());
