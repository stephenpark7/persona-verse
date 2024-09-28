import type { FC } from 'react';

interface CloseButtonProps {
  closeBurgerMenu: () => void;
}

export const CloseButton: FC<CloseButtonProps> = ({ closeBurgerMenu }) => {
  return (
    <div
      className="text-lg cursor-pointer hover:text-red-700 ease-in-out duration-200"
      onClick={closeBurgerMenu}
    >
      Close
    </div>
  );
};
