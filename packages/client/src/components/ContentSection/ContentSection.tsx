import type { FC } from 'react';
import type { ContentSectionProps } from '@types';
import { Buttons, TweetContainer } from '@components';

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
