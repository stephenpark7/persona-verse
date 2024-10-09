import { render, screen } from '@testing-library/react';
import { Profile } from './Profile';

describe('Profile', () => {
  beforeEach(() => {
    render(<Profile />);
  });

  it('renders the profile component', () => {
    expect(screen.getByTestId('profile')).toBeInTheDocument();
  });

  it('renders the header component', () => {
    expect(screen.getByLabelText('header')).toBeInTheDocument();
  });

  it('renders the profile picture', () => {
    expect(screen.getByRole('img', { name: 'Profile' })).toBeInTheDocument();
  });

  it('renders the username', () => {
    expect(
      screen.getByRole('heading', { name: 'username', level: 2 }),
    ).toBeInTheDocument();
  });

  it('renders the bio', () => {
    expect(screen.getByRole('paragraph', { name: 'bio' })).toBeInTheDocument();
  });

  // add tests to ensure username and bio are correct
});
