import { useDocumentTitle, useUserState } from '@hooks';
import { Header, WelcomeMessage, ContentSection } from '@components';
import { APP_TITLE } from '@utils';

export const Home: React.FC = (): React.JSX.Element => {
  const { jwt, isLoggedIn } = useUserState();

  useDocumentTitle(APP_TITLE);

  return (
    <div>
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
  );
};
