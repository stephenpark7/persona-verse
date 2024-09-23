import { FC } from 'react';
import { useUserState } from '@hooks';
import { Header, WelcomeMessage, ContentSection } from '@components';

export const Home: FC = () => {
  const { jwt, isLoggedIn } = useUserState();

  return !isLoggedIn ? (
    <>
      <Header title="PersonaVerse" />
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
