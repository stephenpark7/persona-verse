import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components';
import { logout } from '@services';
import { useAppStoreDispatch, tweetAPI } from '@redux';

export const LogoutButton: React.FC = (): React.JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppStoreDispatch();

  const handleLogout = async () => {
    await logout(
      {
        username: '',
        email: '',
        password: '',
      },
      navigate,
      { showToast: true },
    );
    dispatch(tweetAPI.util.invalidateTags(['Tweets']));
  };

  return (
    <Button
      onClickEvent={handleLogout}
      width="w-20"
    >
      Log out
    </Button>
  );
};
