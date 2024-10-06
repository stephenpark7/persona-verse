import { useEffect, useState, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../Logo';
import { Dropdown } from './Dropdown';
import { BurgerMenu } from './BurgerMenu';

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
      data-testid="navbar"
      className="bg-white h-14 px-3 py-2 select-none shadow-md sticky top-0 z-50"
      role="navigation"
    >
      <Logo />
      {isBurgerMenuOpen ? (
        <Dropdown closeBurgerMenu={() => setIsBurgerMenuOpen(false)} />
      ) : (
        <BurgerMenu setIsBurgerMenuOpen={setIsBurgerMenuOpen} />
      )}
    </nav>
  );
};
