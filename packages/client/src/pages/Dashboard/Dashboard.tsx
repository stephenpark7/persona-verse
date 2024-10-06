import type { FC } from 'react';
import { useUserState } from '@hooks';
import { Header, WelcomeMessage, ContentSection } from '@components';

export const Dashboard: FC = () => {
  const { jwt, isLoggedIn } = useUserState();

  return isLoggedIn ? (
    <div data-testid="dashboard">
      <Header title="Dashboard" />
      <WelcomeMessage
        jwt={jwt}
        isLoggedIn={isLoggedIn}
      />
      <ContentSection
        jwt={jwt}
        isLoggedIn={isLoggedIn}
      />
    </div>
  ) : null;
};
