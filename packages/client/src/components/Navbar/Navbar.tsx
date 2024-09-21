import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Navbar: FC = () => {
  const burgerMenuSvg = (
    <svg
      width="26px"
      height="26px"
      viewBox="0 0 12 12"
      enableBackground="new 0 0 12 12"
      version="1.1"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <rect
          fill="#000"
          height="1"
          width="11"
          x="0.5"
          y="5.5"
        />

        <rect
          fill="#000"
          height="1"
          width="11"
          x="0.5"
          y="2.5"
        />

        <rect
          fill="#000"
          height="1"
          width="11"
          x="0.5"
          y="8.5"
        />
      </g>
    </svg>
  );

  const handleBurgerMenuClick = (): void => {
    console.log('Burger menu clicked');
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
        {burgerMenuSvg}
      </div>
    </nav>
  );
};
