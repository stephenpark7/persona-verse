import type { FC } from 'react';

export interface HeaderProps {
  title: string;
}

export const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <h1
      data-testid="header"
      className="font-semibold text-3xl mb-4"
    >
      {title}
    </h1>
  );
};
