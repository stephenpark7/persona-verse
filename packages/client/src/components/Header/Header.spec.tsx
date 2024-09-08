import { render, screen } from '@testing-library/react';
import { Header } from '@pages';

describe('Header Component', () => {
  const title = 'PersonaVerse';

  test('renders the title', () => {
    render(<Header title={title} />);

    expect(
      screen.getByRole('heading', {
        name: title,
        level: 1,
      }),
    ).toBeInTheDocument();
  });
});
