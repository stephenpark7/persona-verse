import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <div
      data-testid="logo"
      className="w-8"
    >
      <Link
        data-testid="logo-link"
        className="w-8 block"
        to="/"
      >
        <span className="font-semibold text-4xl">P</span>
        <span className="text-gray-500 font-thin text-4xl right-3 relative">
          V
        </span>
      </Link>
    </div>
  );
};
