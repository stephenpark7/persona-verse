import { useDocumentTitle } from '@hooks';
import { FC } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const MainLayout: FC<MainLayoutProps> = ({ children, title }) => {
  useDocumentTitle(title);

  return <div className="m-5">{children}</div>;
};
