import { renderWithRouter, screen } from '@tests/helpers';
import { preloadedStateFactory } from '@factories';
import { APP_TITLE } from '@utils';
import { Header } from './';

describe('When rendering the header', () => {
  beforeEach(() => {
    renderWithRouter(<Header title={APP_TITLE} />, preloadedStateFactory());
  });

  it('displays the title', () => {
    expect(screen.getByTestId('header')).toHaveTextContent(APP_TITLE);
  });
});
