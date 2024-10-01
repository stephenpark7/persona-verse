import type { FC } from 'react';
import BurgerMenuIconSvg from '@assets/images/burger-menu-icon.svg';

export const BurgerMenuIcon: FC = () => {
  return (
    <img
      data-testid="navbar-burger-menu-icon"
      alt="Burger menu icon"
      src={BurgerMenuIconSvg}
    />
  );
};
