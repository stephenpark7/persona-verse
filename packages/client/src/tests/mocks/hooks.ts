import { vi } from 'vitest';
import { useUserState } from '@hooks';
import { UserTypes, useUserStateFactory } from '@factories';

vi.mock('@hooks', () => ({
  useUserState: vi.fn(),
}));

export const useUserStateStubGuest = () => vi.mocked(useUserState).mockImplementationOnce(() => useUserStateFactory(UserTypes.Guest));

export const useUserStateStubUser = () => vi.mocked(useUserState).mockImplementationOnce(() => useUserStateFactory(UserTypes.User));
