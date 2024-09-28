import { renderWithBrowserRouter } from './render';
import { Button } from '@components';
import { buttonProps } from '@schemas';
import type { ButtonProps } from '@types';

export const renderButton = ({ name, link, children }: ButtonProps): void => {
  buttonProps.parse({ name, link, children });

  renderWithBrowserRouter(
    <Button
      name={name}
      link={link}
    >
      {children}
    </Button>,
  );
};
