import { render, screen, fireEvent } from '@testing-library/react';
import { TweetButton } from './TweetButton';

describe('When rendering the TweetButton', () => {
  const mockOnPostTweet = vi.fn();

  beforeEach(() => {
    render(<TweetButton onPostTweet={mockOnPostTweet} />);
  });

  it('renders the button', () => {
    expect(screen.getByText('Tweet')).toBeInTheDocument();
  });

  it('calls handleClickEvent on button click', () => {
    const button = screen.getByText('Tweet');
    fireEvent.click(button);
    expect(mockOnPostTweet).toHaveBeenCalled();
  });
});
