import { FC } from 'react';
import { BurgerMenuIcon } from '../BurgerMenuIcon';

interface BurgerMenuProps {
  setIsBurgerMenuOpen: (isOpen: boolean) => void;
}

export const BurgerMenu: FC<BurgerMenuProps> = ({ setIsBurgerMenuOpen }) => {
  return (
    <div
      data-testid="navbar-burger-menu"
      className="absolute right-3 top-4 cursor-pointer"
      onClick={() => setIsBurgerMenuOpen(true)}
    >
      <BurgerMenuIcon />
    </div>
  );
};
