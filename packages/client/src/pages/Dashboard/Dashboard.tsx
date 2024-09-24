import { FC } from 'react';
import { useUserState } from '@hooks';
import { Header, WelcomeMessage, ContentSection } from '@components';

export const Dashboard: FC = () => {
  const { jwt, isLoggedIn } = useUserState();

  return isLoggedIn ? (
    <>
      <Header title="Dashboard" />
      <WelcomeMessage
        jwt={jwt}
        isLoggedIn={isLoggedIn}
      />
      <ContentSection
        jwt={jwt}
        isLoggedIn={isLoggedIn}
      />
    </>
  ) : null;
};
