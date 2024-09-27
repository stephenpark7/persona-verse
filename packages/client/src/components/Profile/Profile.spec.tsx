import { useUserStateStub } from '@mocks';
// import { screen } from '@testing-library/react';
import { UserType } from '@factories';
import { renderPage } from '@helpers';
import { Profile } from '@components';

describe('When rendering the profile', () => {
  beforeEach(() => {
    useUserStateStub(UserType.GUEST);
    renderPage(<Profile />);
  });

  it.skip('displays the profile', () => {
    // wip
  });
});
