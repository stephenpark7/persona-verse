import React from 'react';
import { LogoutButton, TweetContainer } from '@components';
import { Buttons } from '../Buttons/Buttons';
import { JWT } from '@shared';

interface ContentSectionProps {
  jwt: JWT | null;
  isLoggedIn: boolean;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  jwt,
  isLoggedIn,
}) => {
  const content = isLoggedIn ? (
    <div>
      <TweetContainer
        jwt={jwt}
        isLoggedIn={isLoggedIn}
      />
      <LogoutButton />
    </div>
  ) : (
    <Buttons />
  );

  return <div className="flex gap-2">{content}</div>;
};
