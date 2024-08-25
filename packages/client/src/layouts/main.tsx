import React, { useEffect } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const MainLayout = ({ 
  children,
  title,
}: MainLayoutProps) => {
  useEffect(() => {
    document.title = title;
  }, [ title ]);

  return (
    <div className='m-5'>
      {children}
    </div>
  );
};
