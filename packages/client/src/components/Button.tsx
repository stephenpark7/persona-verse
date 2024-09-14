import React from 'react';

// TODO: rename extraStyles to overrideCSS

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.FormEvent) => void;
  children: React.ReactNode;
  overrideCSS?: string;
  width?: string;
  height?: string;
}

export const Button: React.FC<ButtonProps> = ({
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
      onClick={(e: React.FormEvent) => onClick && onClick(e)}
      className={`border border-black rounded bg-white ${height ?? 'h-9'} ${width ?? 'w-24'} text-md hover:bg-black hover:text-white transition-colors ease-in-out duration-200 ${overrideCSS}`}
    >
      {children}
    </button>
  );
};
