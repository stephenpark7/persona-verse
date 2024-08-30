import { screen } from '@testing-library/react';
import { TweetContainer } from '@components';
import { beforeEach, describe, expect, it } from 'vitest';
// import { UserType } from '@factories';
// import { useUserStateStub } from '@mocks';
import { renderWithProviders } from '@core';

describe('TweetContainer component', () => {
  beforeEach(() => {
    // useUserStateStub(UserType.User);
    renderWithProviders(<TweetContainer />);
  });

  it('renders content', () => {
    expect(screen.getByText('TweetContainer')).toBeInTheDocument();
  });
});
