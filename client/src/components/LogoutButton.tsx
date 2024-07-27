import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useJWT } from '../stores';
import API from '../api';

export default function LogoutButton() {
  const { jwt } = useJWT();
  const navigate = useNavigate();

  async function handleLogout() {
    await API.logout(jwt, navigate);
  }

  return (
    <Button
      variant='primary'
      onClick={handleLogout}>Log out
    </Button>
  );
}
