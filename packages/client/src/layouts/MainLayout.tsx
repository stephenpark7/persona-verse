import type { FC, ReactNode } from 'react';
import { useDocumentTitle } from '@hooks';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
}

export const MainLayout: FC<MainLayoutProps> = ({ children, title }) => {
  useDocumentTitle(title);

  return (
    <div
      data-testid="layout"
      className="mx-4 my-6"
    >
      {children}
    </div>
  );
};
