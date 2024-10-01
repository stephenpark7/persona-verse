import { render, screen } from '@testing-library/react';
import { Profile } from './Profile';

describe('Profile', () => {
  it('should render', () => {
    render(<Profile />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });
});
