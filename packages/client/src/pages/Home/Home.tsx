import React from 'react';
import { Link } from 'react-router-dom';
import { getDisplayName } from '@utils';
import { useUserState } from '@hooks';
import { Button, LogoutButton, TweetContainer, Profile } from '@components';
import { Header, WelcomeMessage, BodyContent } from './components';

export const Home: React.FC = (): React.JSX.Element => {
  const { jwt, isLoggedIn } = useUserState();

  // TODO: add tests for modularized components

  // TODO: move to a helper function
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
    // modularize buttons into a component
    <div className="flex gap-2">
      <Link to="/signup">
        <Button>Sign up</Button>
      </Link>
      <Link to="/login">
        <Button>Log in</Button>
      </Link>
    </div>
  );

  return (
    <div>
      <Header title="PersonaVerse" />
      <WelcomeMessage message={welcomeMessageContent} />
      <BodyContent content={bodyContent} />
    </div>
  );
};
