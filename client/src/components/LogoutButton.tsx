import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { Button } from 'react-bootstrap';

export default function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useUserContext();

  return (
    <Button
      variant='primary'
      onClick={() => logout(navigate)}>Log out
    </Button>
  );
}
