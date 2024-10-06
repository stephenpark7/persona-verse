import type { FC } from 'react';
import { useUserState } from '@hooks';
import { Header, WelcomeMessage, ContentSection } from '@components';

export const Home: FC = () => {
  const { jwt, isLoggedIn } = useUserState();

  return !isLoggedIn ? (
    <div data-testid="home">
      <Header title="PersonaVerse" />
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
