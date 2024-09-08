import React from 'react';
import { useUserState } from '@hooks';
import { LogoutButton, TweetContainer, Profile } from '@components';
import { Header, WelcomeMessage, BodyContent } from './components';
import { Buttons } from './components/Buttons';

export const Home: React.FC = (): React.JSX.Element => {
  const { jwt, isLoggedIn } = useUserState();

  const bodyContent = isLoggedIn ? (
    <div>
      <Profile />
      <TweetContainer />
      <LogoutButton />
    </div>
  ) : (
    <Buttons />
  );

  return (
    <div>
      <Header title="PersonaVerse" />
      <WelcomeMessage
        jwt={jwt}
        isLoggedIn={isLoggedIn}
      />
      <BodyContent content={bodyContent} />
    </div>
  );
};
