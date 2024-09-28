import { render, screen } from '@testing-library/react';
import { Profile } from './Profile';

describe('Profile', () => {
  it('should render', () => {
    render(<Profile />);
    screen.debug();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
