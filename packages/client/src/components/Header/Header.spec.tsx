import { render, screen } from '@testing-library/react';
import { Header } from '@components';
import { APP_TITLE } from '@utils';

describe('When rendering the header', () => {
  it('displays the title', () => {
    render(<Header title={APP_TITLE} />);

    expect(
      screen.getByRole('heading', {
        name: APP_TITLE,
        level: 1,
      }),
    ).toBeInTheDocument();
  });
});
