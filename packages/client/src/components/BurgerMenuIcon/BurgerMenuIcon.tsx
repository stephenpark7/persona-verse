import type { FC } from 'react';
import BurgerMenuIconSvg from '@assets/images/burger-menu-icon.svg';

export const BurgerMenuIcon: FC = () => {
  return (
    <img
      src={BurgerMenuIconSvg}
      alt="Burger menu icon"
      data-testid="burger-menu-icon"
    />
  );
};
