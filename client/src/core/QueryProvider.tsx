import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface QueryProviderProps {
  children: React.JSX.Element[] | React.JSX.Element;
};

export const QueryProvider = ({ children }: QueryProviderProps): React.JSX.Element => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
