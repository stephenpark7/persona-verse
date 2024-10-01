import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { LogoutButton } from '@components';
import { Item } from './Item';
import { CloseButton } from './CloseButton';

interface DropdownProps {
  closeBurgerMenu: () => void;
}

export const Dropdown: FC<DropdownProps> = ({ closeBurgerMenu }) => {
  return (
    <div
      data-testid="navbar-dropdown"
      className="dropdown absolute right-0 top-0 bg-white border border-gray-200 border-opacity-80 rounded-md drop-shadow-lg"
    >
      <div className="flex flex-col min-w-24 min-h-12 justify-center p-3">
        <ul className="flex flex-col items-end justify-end gap-3">
          <Item>
            <Link
              aria-label="navbar-dropdown-dashboard-link"
              to="/"
            >
              Dashboard
            </Link>
          </Item>
          <Item>
            <Link
              aria-label="navbar-dropdown-profile-link"
              to="/profile"
            >
              Profile
            </Link>
          </Item>
          <Item>
            <LogoutButton />
          </Item>
          <Item>
            <CloseButton closeBurgerMenu={closeBurgerMenu} />
          </Item>
        </ul>
      </div>
    </div>
  );
};
