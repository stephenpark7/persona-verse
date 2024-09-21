import { FC } from 'react';
import { LogoutButton } from '@components';

interface DropdownProps {
  closeBurgerMenu: () => void;
}

export const Dropdown: FC<DropdownProps> = ({ closeBurgerMenu }) => {
  return (
    <div className="absolute right-0 top-0 bg-white border border-gray-200 border-opacity-80 rounded-md drop-shadow-lg">
      <div className="flex flex-col min-w-24 min-h-12 justify-center p-3">
        <ul className="flex flex-col items-end justify-end gap-3">
          <li className="text-lg text-gray-900 cursor-pointer hover:text-gray-500 ease-in-out duration-200">
            <LogoutButton />
          </li>
          <li>
            <div
              className="text-lg cursor-pointer hover:text-red-700 ease-in-out duration-200"
              onClick={closeBurgerMenu}
            >
              Close
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
