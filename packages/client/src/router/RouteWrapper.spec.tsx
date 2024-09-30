import { screen } from '@testing-library/react';
import { renderWithRouter } from '@tests/helpers';
import { jwtFactory, preloadedStateFactory, tweetFactory } from '@factories';
import { RouteWrapper } from './RouteWrapper';

const title = 'PersonaVerse - Dashboard';
const children = 'children';

const jwt = jwtFactory();
const tweets = [tweetFactory()];
const preloadedState = preloadedStateFactory({
  user: {
    value: {
      jwt,
      tweets,
    },
  },
});

describe('RouterWrapper', () => {
  beforeEach(() => {
    renderWithRouter(
      <RouteWrapper title={title}>{children}</RouteWrapper>,
      preloadedState,
    );
  });

  it('should render children', () => {
    expect(screen.getByText(children)).toBeInTheDocument();
  });

  it('should set document title', () => {
    expect(document.title).toBe(title);
  });
});
