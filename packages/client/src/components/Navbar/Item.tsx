import type { FC, ReactNode } from 'react';

interface ItemProps {
  children: ReactNode;
}

export const Item: FC<ItemProps> = ({ children }) => {
  return (
    <li
      data-testid="navbar-dropdown-item"
      className="text-lg text-gray-900 cursor-pointer hover:text-gray-500 ease-in-out duration-200"
    >
      {children}
    </li>
  );
};
