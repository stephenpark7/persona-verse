import { useEffect, useState, FC } from 'react';
import { BurgerMenuSvg } from '../BurgerMenuSvg';
import { Dropdown } from './Dropdown';
import { Logo } from '../Logo/Logo';
import { useNavigate } from 'react-router-dom';

export const Navbar: FC = () => {
  const navigate = useNavigate();
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && !e.target.closest('.dropdown')) {
        setIsBurgerMenuOpen(false);
      }
    };
    setIsBurgerMenuOpen(false);

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate]);

  return (
    <nav
      className="bg-white h-14 px-3 py-2 select-none shadow-md sticky top-0 z-50"
      role="navigation"
    >
      <Logo />

      {isBurgerMenuOpen ? (
        <Dropdown
          isBurgerMenuOpen={isBurgerMenuOpen}
          closeBurgerMenu={() => setIsBurgerMenuOpen(false)}
        />
      ) : (
        <div
          className="absolute right-3 top-4 cursor-pointer"
          onClick={() => setIsBurgerMenuOpen(true)}
        >
          <BurgerMenuSvg />
        </div>
      )}
    </nav>
  );
};