import { useUserState } from '@hooks';
import { mockJwt } from '../mocks';

const useUserStateStub = vi.mocked(useUserState);

useUserStateStub.mockReturnValue({ 
  jwt: mockJwt,
  isLoggedIn: true,
  tweets: null,
});
