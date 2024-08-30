import React from 'react';
import { render, screen } from '@testing-library/react';
import { TweetInput } from './';
import { beforeEach, describe, test, expect, vi } from 'vitest';

describe('TweetInput component', () => {
  const mockSetTweetInput = vi.fn();
  // const mockUseState = vi.fn().mockImplementation(init => [init, mockSetTweetInput]);

  // vi.spyOn(React, 'useState').mockImplementation(mockUseState);

  const tweetInput = '';
  const setTweetInput = mockSetTweetInput;

  beforeEach(() => {
    render(<TweetInput 
      tweetInputState={[ tweetInput, setTweetInput ]}
    />);
  });

  test('renders input field', () => {
    expect(screen.getByPlaceholderText("What's happening?")).toBeInTheDocument();
  });
});
