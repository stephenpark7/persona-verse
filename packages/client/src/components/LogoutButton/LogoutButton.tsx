import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '@services';
import { useAppStoreDispatch, tweetAPI } from '@redux';

export const LogoutButton: FC = (): React.JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppStoreDispatch();

  const handleLogout = async () => {
    await logout({
      navigateFunction: navigate,
      options: { showToast: true },
    });
    dispatch(tweetAPI.util.invalidateTags(['Tweets']));
  };

  return <div onClick={handleLogout}>Log out</div>;
};
