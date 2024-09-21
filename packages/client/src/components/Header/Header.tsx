import React from 'react';

export interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return <h1 className="font-semibold text-3xl mb-4">{title}</h1>;
};
