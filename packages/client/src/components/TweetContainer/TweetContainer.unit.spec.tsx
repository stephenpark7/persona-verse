import { useUserStateStub } from '@mocks';
import { beforeEach, describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { UserType } from '@factories';
import { renderWithProviders } from '@core';
import { TweetContainer } from '@components';

describe('TweetContainer component', () => {
  beforeEach(() => {
    useUserStateStub(UserType.USER);
    renderWithProviders(<TweetContainer />);
  });

  it('renders content', () => {
    expect(screen.getByText('TweetContainer')).toBeInTheDocument();
  });
});
