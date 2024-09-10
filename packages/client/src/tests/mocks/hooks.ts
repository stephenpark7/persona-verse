import { vi } from 'vitest';
import { useUserState } from '@hooks';
import { UserType, useUserStateFactory } from '@factories';

vi.mock('@hooks', () => ({
  useUserState: vi.fn(),
  // usePostTweetMutation: vi.fn(),
  // useDispatch: vi.fn(),
  // useAppStoreDispatch: vi.fn(),
}));

export const useUserStateStub = (type: UserType) =>
  vi.mocked(useUserState).mockImplementation(useUserStateFactory(type));
