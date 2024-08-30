import { render, screen } from '@testing-library/react';
import { Header } from '@pages';

describe('Header Component', () => {
  test('renders the title', () => {
    const title = 'PersonaVerse';
    render(<Header title={title} />);
    expect(
      screen.getByRole('heading', {
        name: title,
        level: 1,
      }),
    ).toBeInTheDocument();
  });
});
