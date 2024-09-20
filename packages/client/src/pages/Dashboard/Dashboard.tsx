import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '@hooks';
import { Header, WelcomeMessage, ContentSection } from '@components';

// TODO move logout to navbar

export const Dashboard: FC = () => {
  const navigate = useNavigate();
  const { jwt, isLoggedIn } = useUserState();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, []);

  return isLoggedIn ? (
    <>
      <Header title="Dashboard" />
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
