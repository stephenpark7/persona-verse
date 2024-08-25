import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components';
import { logout } from '@services';

export const LogoutButton: React.FC = (): React.JSX.Element => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(navigate);
  };

  return (
    <Button
      onClickEvent={handleLogout}
      width='w-20'
    >
    Log out
    </Button>
  );
};
