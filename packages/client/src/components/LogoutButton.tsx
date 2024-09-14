import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components';
import { logout } from '@services';
import { useAppStoreDispatch, tweetAPI } from '@redux';

export const LogoutButton: React.FC = (): React.JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppStoreDispatch();

  const handleLogout = async () => {
    await logout({
      navigateFunction: navigate,
      options: { showToast: true },
    });
    dispatch(tweetAPI.util.invalidateTags(['Tweets']));
  };

  return (
    <Button
      onClick={handleLogout}
      width="w-20"
    >
      Log out
    </Button>
  );
};
