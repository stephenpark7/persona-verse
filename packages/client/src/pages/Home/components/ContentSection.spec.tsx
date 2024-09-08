import { useUserStateStub } from '@mocks';
import { beforeEach, describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContentSection } from '@pages';
import { UserType } from '@factories';

describe('ContentSection Component', () => {
  beforeEach(() => {
    const useUserState = useUserStateStub(UserType.USER);
    const { isLoggedIn } = useUserState();
    render(<ContentSection isLoggedIn={isLoggedIn} />);
  });

  test('renders the Profile component', () => {
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  test('renders the TweetContainer component', () => {
    expect(screen.getByText('TweetContainer')).toBeInTheDocument();
  });

  test('renders the LogoutButton conmponent', () => {
    screen.debug();
    expect(screen.getByText('LogoutButton')).toBeInTheDocument();
  });
});
