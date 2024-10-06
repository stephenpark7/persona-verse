import type { FC } from 'react';
import { getDisplayName } from '@utils';
import type { Jwt } from '@shared/types';

interface WelcomeMessageProps {
  jwt: Jwt;
  isLoggedIn: boolean;
}

export const WelcomeMessage: FC<WelcomeMessageProps> = ({
  jwt,
  isLoggedIn,
}) => {
  const message = isLoggedIn
    ? `Welcome ${getDisplayName(jwt)}!`
    : 'Create an account or log in.';

  return (
    <p
      aria-label="welcome-message"
      className="text-lg mb-4"
    >
      {message}
    </p>
  );
};
