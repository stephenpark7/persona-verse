import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TweetInput } from './';
import { beforeEach, describe, test, expect, vi } from 'vitest';

describe('TweetInput component', () => {
  const mockSetTweetInput = vi.fn();
  // const mockUseState = vi.fn().mockImplementation(init => [init, mockSetTweetInput]);

  // vi.spyOn(React, 'useState').mockImplementation(mockUseState);

  const tweetInput = '';
  const setTweetInput = mockSetTweetInput;

  beforeEach(() => {
    render(
      <TweetInput state={[tweetInput, setTweetInput]} onPostTweet={vi.fn()} />,
    );
  });

  test('renders input field', () => {
    expect(
      screen.getByPlaceholderText("What's happening?"),
    ).toBeInTheDocument();
  });

  test('calls handleOnChange', () => {
    const input = screen.getByPlaceholderText("What's happening?");
    fireEvent.change(input, {
      target: { value: 'test' },
    });
    expect(mockSetTweetInput).toHaveBeenCalledWith('test');
  });

  test('calls handleKeyUp', () => {
    const input = screen.getByPlaceholderText("What's happening?");
    fireEvent.change(input, {
      target: { value: 'test' },
    });
    fireEvent.keyUp(input, { key: 'Enter' });
    expect(mockSetTweetInput).toHaveBeenCalledWith('test');
  });
});
