import React from 'react';

// TODO: rename extraStyles to overrideCSS

interface ButtonProps {
  variant?: string;
  type?: 'button' | 'submit' | 'reset';
  onClickEvent?: (e: React.FormEvent) => void;
  children: React.ReactNode;
  overrideCSS?: string;
  width?: string;
  height?: string;
}

export const Button: React.FC<ButtonProps> = ({
  // variant,
  type = 'button',
  onClickEvent,
  children,
  overrideCSS,
  width,
  height,
}): React.JSX.Element => {
  return (
    <button
      type={type}
      onClick={(e: React.FormEvent) => onClickEvent && onClickEvent(e)}
      className={`border border-black rounded bg-white ${height ?? 'h-9'} ${width ?? 'w-24'} text-md hover:bg-black hover:text-white transition-colors ease-in-out duration-200 ${overrideCSS}`}
    >
      {children}
    </button>
  );
};
