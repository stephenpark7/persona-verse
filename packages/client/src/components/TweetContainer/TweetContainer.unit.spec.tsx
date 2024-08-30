import { render, screen } from '@testing-library/react';
import { TweetContainer } from '@components';
import { beforeEach, describe, test, expect } from 'vitest';

describe('TweetContainer component', () => {
  beforeEach(() => {
    render(<TweetContainer />);
  });

  test('renders content', () => {
    expect(screen.getByText('TweetContainer')).toBeInTheDocument();
  });
});
