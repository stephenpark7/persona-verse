import React from 'react';
import { LogoutButton, TweetContainer, Profile } from '@components';
import { Buttons } from './Buttons';

interface ContentSectionProps {
  isLoggedIn: boolean;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  isLoggedIn,
}) => {
  const content = isLoggedIn ? (
    <div>
      <Profile />
      <TweetContainer />
      <LogoutButton />
    </div>
  ) : (
    <Buttons />
  );

  return <div className="flex gap-2">{content}</div>;
};
