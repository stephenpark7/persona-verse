import { render, screen } from '@testing-library/react';
import { Header } from '@pages';

describe('Header Component', () => {
  test('renders the Header component', () => {
    render(<Header title={'PersonaVerse'} />);
    expect(screen.getByRole('heading', { name: /PersonaVerse/, level: 1 })).toBeInTheDocument();
  });
});
