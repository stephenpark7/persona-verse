import { render, screen } from '@tests/helpers';
import { MainLayout } from './MainLayout';

const title = 'Main Layout';
const children = 'Main Layout Children';

describe('MainLayout', () => {
  beforeEach(() => {
    render(<MainLayout title={title}>{children}</MainLayout>);
  });

  it('renders layout', () => {
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('renders children', () => {
    expect(screen.getByTestId('layout')).toHaveTextContent(children);
  });

  it('sets document title', () => {
    expect(document.title).toBe(title);
  });
});
