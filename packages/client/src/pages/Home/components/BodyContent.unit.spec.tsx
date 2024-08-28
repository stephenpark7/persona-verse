import { render, screen } from '@testing-library/react';
import { BodyContent } from '@pages';
import { beforeEach, describe, test, expect } from 'vitest';

describe('BodyContent Component', () => {
  const contentText = <>
    <div>Profile</div>
    <div>TweetContainer</div>
    <div>LogoutButton</div>
  </>;

  beforeEach(() => {
    render(<BodyContent content={contentText} />);
  });

  test('renders the Profile content', () => {
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  test('renders the TweetContainer content', () => {
    expect(screen.getByText('TweetContainer')).toBeInTheDocument();
  });

  test('renders the LogoutButton content', () => {
    expect(screen.getByText('LogoutButton')).toBeInTheDocument();
  });
});
