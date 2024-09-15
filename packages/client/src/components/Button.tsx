import { FC, FormEvent } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.FormEvent) => void;
  children: React.ReactNode;
  overrideCSS?: string;
  width?: string;
  height?: string;
}

export const Button: FC<ButtonProps> = ({
  type = 'button',
  onClick,
  children,
  overrideCSS,
  width,
  height,
}): React.JSX.Element => {
  return (
    <button
      type={type}
      onClick={(e: FormEvent) => onClick && onClick(e)}
      className={`border border-black rounded bg-white ${height ?? 'h-10'} ${width ?? 'w-24'} text-md hover:bg-black hover:text-white transition-colors ease-in-out duration-200 ${overrideCSS}`}
    >
      {children}
    </button>
  );
};
