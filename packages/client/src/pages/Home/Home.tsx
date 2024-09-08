import React from 'react';
import { useUserState } from '@hooks';
import { Header, WelcomeMessage, ContentSection } from './components';

export const Home: React.FC = (): React.JSX.Element => {
  const { jwt, isLoggedIn } = useUserState();

  return (
    <div>
      <Header title="PersonaVerse" />
      <WelcomeMessage
        jwt={jwt}
        isLoggedIn={isLoggedIn}
      />
      <ContentSection isLoggedIn={isLoggedIn} />
    </div>
  );
};
