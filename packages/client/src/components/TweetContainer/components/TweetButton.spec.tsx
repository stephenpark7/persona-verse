import { render, screen, fireEvent } from '@tests/helpers';
import { TweetButton } from './TweetButton';

const mockOnPostTweet = vi.fn();

describe('When rendering the TweetButton', () => {
  beforeEach(() => {
    render(<TweetButton onPostTweet={mockOnPostTweet} />);
  });

  it('renders the button', () => {
    expect(screen.getByText('Tweet')).toBeInTheDocument();
  });

  it('calls handleClickEvent on button click', () => {
    fireEvent.click(screen.getByText('Tweet'));
    expect(mockOnPostTweet).toHaveBeenCalled();
  });
});
