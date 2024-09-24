import { FC, FormEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: FormEvent) => void;
  children: ReactNode;
  overrideCSS?: string;
  width?: string;
  height?: string;
  link?: string;
}

export const Button: FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
  overrideCSS,
  width,
  height,
  link,
}): React.JSX.Element => {
  const buttonJsx = (
    <button
      type={type}
      onClick={(e: FormEvent) => onClick && onClick(e)}
      className={`border border-black rounded bg-white ${height ?? 'h-10'} ${width ?? 'w-24'} text-md hover:bg-black hover:text-white transition-colors ease-in-out duration-200 ${overrideCSS}`}
    >
      {children}
    </button>
  );

  return link ? <Link to={link}>{buttonJsx}</Link> : buttonJsx;
};
