import React from 'react';

export interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return <h1 className="text-5xl mb-6">{title}</h1>;
};
