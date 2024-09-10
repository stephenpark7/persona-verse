import { render, screen, fireEvent } from '@testing-library/react';
import { TweetInput } from '.';

describe('When rendering the tweet input', () => {
  const mockSetTweetInput = vi.fn();
  const tweetInput = '';
  const setTweetInput = mockSetTweetInput;

  beforeEach(() => {
    render(
      <TweetInput state={[tweetInput, setTweetInput]} onPostTweet={vi.fn()} />,
    );
  });

  it('renders input field', () => {
    expect(
      screen.getByPlaceholderText("What's happening?"),
    ).toBeInTheDocument();
  });

  it('calls handleOnChange', () => {
    const input = screen.getByPlaceholderText("What's happening?");
    fireEvent.change(input, {
      target: { value: 'test' },
    });
    expect(mockSetTweetInput).toHaveBeenCalledWith('test');
  });

  it('calls handleKeyUp', () => {
    const input = screen.getByPlaceholderText("What's happening?");
    fireEvent.change(input, {
      target: { value: 'test' },
    });
    fireEvent.keyUp(input, { key: 'Enter' });
    expect(mockSetTweetInput).toHaveBeenCalledWith('test');
  });
});
