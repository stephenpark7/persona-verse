import type { FC } from 'react';
import { TweetContainer } from '@components';
import { Buttons } from '../Buttons/Buttons';
import { Jwt } from '@schemas';

interface ContentSectionProps {
  jwt: Jwt | null;
  isLoggedIn: boolean;
}

export const ContentSection: FC<ContentSectionProps> = ({
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
