import '../../tests/mocks/components.unit';
import { useUserStateStub } from '../../tests/mocks/hooks.unit';

import { screen } from '@testing-library/react';
import { TweetContainer } from '@components';
import { beforeEach, describe, expect, it } from 'vitest';
import { renderWithProviders } from '@core';
import { UserType } from '@factories';

describe('TweetContainer component', () => {
  beforeEach(() => {
    useUserStateStub(UserType.USER);
    renderWithProviders(<TweetContainer />);
  });

  it('renders content', () => {
    expect(screen.getByText('TweetContainer')).toBeInTheDocument();
  });
});
