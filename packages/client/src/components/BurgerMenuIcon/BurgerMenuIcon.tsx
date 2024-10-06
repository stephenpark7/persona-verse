import type { FC } from 'react';
import BurgerMenuIconSvg from '@assets/images/burger-menu-icon.svg';

export const BurgerMenuIcon: FC = () => {
  return (
    <img
      alt="Burger menu icon"
      src={BurgerMenuIconSvg}
    />
  );
};
