import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import API from '../api';

export default function LogoutButton() {
  const navigate = useNavigate();

  async function handleLogout() {
    await API.logout(navigate);
  }

  return (
    <Button
      variant='primary'
      onClick={handleLogout}>Log out
    </Button>
  );
}
