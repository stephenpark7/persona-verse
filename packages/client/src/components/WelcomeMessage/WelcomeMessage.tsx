import React from 'react';
import { getDisplayName } from '@utils';
import { JWT } from '@shared';

interface WelcomeMessageProps {
  jwt: JWT | null;
  isLoggedIn: boolean;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({
  jwt,
  isLoggedIn,
}) => {
  const message = isLoggedIn
    ? `Welcome ${getDisplayName(jwt)}!`
    : 'Create an account or log in.';

  return <p className="text-lg mb-4">{message}</p>;
};
