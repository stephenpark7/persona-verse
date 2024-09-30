import { render, screen } from '@tests/helpers';
import { APP_TITLE } from '@utils';
import { Header } from '@components';

describe('When rendering the header', () => {
  it('displays the title', () => {
    beforeEach(() => {
      render(<Header title={APP_TITLE} />);
    });

    expect(screen.getByTestId('header')).toHaveTextContent(APP_TITLE);
  });
});
