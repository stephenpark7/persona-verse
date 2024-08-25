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
    <button
      className='primary'
      onClick={handleLogout}>Log out
    </button>
  );
};
