import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getDisplayName } from '@utils';
import { useUserState } from '@hooks';
import { Button, LogoutButton, TweetContainer, Profile } from '@components';

// document.title = 'PersonaVerse';

export const Home: React.FC = (): React.JSX.Element => {
  const { jwt, isLoggedIn } = useUserState();

  const bodyContent = useMemo(() => {
    if (isLoggedIn) {
      const displayName = getDisplayName(jwt);
      return (
        <div>
          <p>Welcome {displayName}!</p>
          <Profile />
          <TweetContainer />
          <LogoutButton />
        </div>
      );
    } 

    return (
      <div>
        <p>Create an account or log in.</p>
        <div className='flex'>
          <Link className='signup-link' to='/signup'>
            <Button variant="primary">Sign up</Button>
          </Link>
          <Link to='/login'>
            <Button variant="primary">Log in</Button>
          </Link>
        </div>
      </div>
    );
  }, [ isLoggedIn ]);

  return (
    <div>
      <h1 className='text-2xl'>PersonaVerse</h1>
      <div>
        {bodyContent}
      </div>
    </div>
  );
};
