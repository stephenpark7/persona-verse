import { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { BurgerMenuSvg } from '../BurgerMenuSvg';
import { Dropdown } from './Dropdown';

export const Navbar: FC = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const handleBurgerMenuClick = (): void => {
    setIsBurgerMenuOpen(() => !isBurgerMenuOpen);
  };

  const handleCloseBurgerMenu = (): void => {
    setIsBurgerMenuOpen(false);
  };

  return (
    <nav
      className="bg-white h-14 px-3 py-2 select-none shadow-md sticky top-0 z-50"
      role="navigation"
    >
      <div className="w-8">
        <Link
          className="w-8 block"
          to="/"
        >
          <span className="font-semibold text-4xl">P</span>
          <span className="text-gray-500 font-thin text-4xl right-3 relative">
            V
          </span>
        </Link>
      </div>

      <div
        className="absolute right-3 top-4 cursor-pointer"
        onClick={handleBurgerMenuClick}
      >
        <BurgerMenuSvg />
      </div>

      {isBurgerMenuOpen && <Dropdown closeBurgerMenu={handleCloseBurgerMenu} />}
    </nav>
  );
};
