import { FC } from 'react';

export const Navbar: FC = () => {
  return (
    <nav
      className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono"
      role="navigation"
    >
      <div className="pl-8">Navbar</div>
    </nav>
  );
};
