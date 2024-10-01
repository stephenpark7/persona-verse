import { render, screen } from '@testing-library/react';
import { tweetFactory } from '@factories';
import { Tweet } from '@components';

const { id, message, createdAt, date, User } = tweetFactory();

describe('When rendering a tweet', () => {
  beforeEach(() => {
    render(
      <Tweet id={id} message={message} createdAt={createdAt} User={User} />,
    );
  });

  it('displays the display name', () => {
    expect(screen.getByLabelText('display-name')).toHaveTextContent(
      User.username,
    );
  });

  it('displays the username', () => {
    expect(screen.getByLabelText('username')).toHaveTextContent(
      `@${User.username}`,
    );
  });

  it('displays the date', () => {
    expect(screen.getByLabelText('date')).toHaveTextContent(date);
  });

  it('displays the message', () => {
    expect(screen.getByLabelText('message')).toHaveTextContent(message);
  });
});
