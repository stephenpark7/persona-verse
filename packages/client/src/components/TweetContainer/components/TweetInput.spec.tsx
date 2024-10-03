import { render, screen, fireEvent } from '@testing-library/react';
import { TweetInput } from '.';

const setTweetInputMock = vi.fn();
const onPostTweetMock = vi.fn();
const tweetInput = '';
const setTweetInput = setTweetInputMock;

describe('TweetInput', () => {
  beforeEach(() => {
    render(
      <TweetInput
        state={[tweetInput, setTweetInput]}
        onPostTweet={onPostTweetMock}
      />,
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
    expect(setTweetInputMock).toHaveBeenCalledWith('test');
  });

  it('calls handleKeyUp', () => {
    const input = screen.getByPlaceholderText("What's happening?");
    fireEvent.change(input, {
      target: { value: 'test' },
    });
    fireEvent.keyUp(input, { key: 'Enter' });
    expect(setTweetInputMock).toHaveBeenCalledWith('test');
    expect(onPostTweetMock).toHaveBeenCalled();
  });
});
