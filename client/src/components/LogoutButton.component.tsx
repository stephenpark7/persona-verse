import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api';

export const LogoutButton: React.FC = (): React.JSX.Element => {
  const navigate = useNavigate();

  async function handleLogout() {
    await logout(navigate);
  }

  return (
    <Button
      variant='primary'
      onClick={handleLogout}>Log out
    </Button>
  );
};
