import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../stores';
import { Button } from 'react-bootstrap';

export default function LogoutButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant='primary'
      onClick={() => logout(navigate)}>Log out
    </Button>
  );
}
