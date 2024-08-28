import React from 'react';
import { render, screen } from '@testing-library/react';
import { TweetInput } from './';
import { beforeEach, describe, test, expect } from 'vitest';

describe('TweetInput component', () => {
  const textRef = React.createRef<HTMLInputElement>();

  beforeEach(() => {
    render(<TweetInput textRef={textRef} />);
  });

  test('renders input field', () => {
    expect(screen.getByPlaceholderText("What's happening?")).toBeInTheDocument();
  });
});
