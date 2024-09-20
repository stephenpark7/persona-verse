import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '@hooks';
import { Header, WelcomeMessage, ContentSection } from '@components';

export const Home: FC = () => {
  const navigate = useNavigate();
  const { jwt, isLoggedIn } = useUserState();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, []);

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
