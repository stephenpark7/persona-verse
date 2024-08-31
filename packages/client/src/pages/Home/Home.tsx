import React from 'react';
import { getDisplayName } from '@utils';
import { useUserState } from '@hooks';
import { LogoutButton, TweetContainer, Profile } from '@components';
import { Header, WelcomeMessage, BodyContent } from './components';
import { Buttons } from './components/Buttons';

export const Home: React.FC = (): React.JSX.Element => {
  const { jwt, isLoggedIn } = useUserState();

  // TODO: add tests for modularized components

  // TODO: move to a helper function
  // to isolate logic for easier testing
  const welcomeMessageContent = isLoggedIn
    ? `Welcome ${getDisplayName(jwt)}!`
    : 'Create an account or log in.';

  // TODO: move to a helper function
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
      <WelcomeMessage message={welcomeMessageContent} />
      <BodyContent content={bodyContent} />
    </div>
  );
};
