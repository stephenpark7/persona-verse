import React from 'react';

interface ButtonProps {
  variant: string;
  type?: string;
  onClickEvent?: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant, onClickEvent, children }): React.JSX.Element => {
  const handleOnClick = (e: React.FormEvent) => {
    if (!onClickEvent) {
      return;
    }
    onClickEvent(e);
  };

  return (
    <button
      className={`btn btn-${variant}`}
      onClick={handleOnClick}>
      {children}
    </button>
  );
};
