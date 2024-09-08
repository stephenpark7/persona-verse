import React, { useLayoutEffect } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const MainLayout = ({ children, title }: MainLayoutProps) => {
  useLayoutEffect(() => {
    document.title = title;
    console.log('MainLayout', title);
  }, []);

  return <div className="m-5">{children}</div>;
};
