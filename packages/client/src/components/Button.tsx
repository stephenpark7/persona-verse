import React from 'react';

interface ButtonProps {
  variant?: string;
  type?: string;
  onClickEvent?: (e: React.FormEvent) => void;
  children: React.ReactNode;
  extraStyles?: string;
  width?: string;
  height?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  // variant,
  // type,
  onClickEvent, 
  children,
  extraStyles,
  width,
  height,
}): React.JSX.Element => {

  return (
    <button onClick={(e: React.FormEvent) => onClickEvent && onClickEvent(e)}
            className={`border border-black rounded bg-white ${height ?? 'h-9'} ${width ?? 'w-24'} text-md hover:bg-black hover:text-white transition-colors ease-in-out duration-200 ${extraStyles}`}>
      {children}
    </button>
  );
};