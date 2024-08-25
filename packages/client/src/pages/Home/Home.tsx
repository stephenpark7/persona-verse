import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getDisplayName } from '@utils';
import { useUserState } from '@hooks';
import { Button, LogoutButton, TweetContainer, Profile } from '@components';

export const Home: React.FC = (): React.JSX.Element => {
  const { jwt, isLoggedIn } = useUserState();

  const welcomeMessageContent = useMemo(() => {
    if (isLoggedIn) {
      return `Welcome ${getDisplayName(jwt)}!`;
    }

    return 'Create an account or log in.';
  }, [ isLoggedIn ]);

  const bodyContent = useMemo(() => {
    if (isLoggedIn) {
      return (
        <div>
          <Profile />
          <TweetContainer />
          <LogoutButton />
        </div>
      );
    }

    return (
      <div className='flex gap-2'>
        <Link to='/signup'>
          <Button>Sign up</Button>
        </Link>
        <Link to='/login'>
          <Button>Log in</Button>
        </Link>
      </div>
    );
  }, [ isLoggedIn ]);

  return (
    <div>
      <h1 className='text-5xl mb-3'>PersonaVerse</h1>
      <p className='text-lg mb-2'>{welcomeMessageContent}</p>
      <div className='flex gap-2'>{bodyContent}</div>
    </div>
  );
};
