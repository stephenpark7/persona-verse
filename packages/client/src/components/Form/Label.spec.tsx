import { render, screen } from '@testing-library/react';
import { Label } from './';

describe('Input', () => {
  beforeEach(() => {
    render(<Label value="Username" />);
  });

  it('renders the input element', () => {
    expect(screen.getByLabelText('label')).toBeInTheDocument();
  });
});
