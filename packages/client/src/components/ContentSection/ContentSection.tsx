import React from 'react';
import { TweetContainer } from '@components';
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
    <TweetContainer
      jwt={jwt}
      isLoggedIn={isLoggedIn}
    />
  ) : (
    <Buttons />
  );

  return <div className="flex flex-col gap-2">{content}</div>;
};
