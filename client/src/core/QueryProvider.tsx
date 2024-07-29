import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface QueryProviderProps {
  children: React.JSX.Element[] | React.JSX.Element;
};

const queryClient = new QueryClient();

export const QueryProvider = ({ children }: QueryProviderProps): React.JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
