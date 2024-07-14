import { useUserContext } from '../contexts/UserContext';
import { Button } from 'react-bootstrap';


export default function LogoutButton() {
  const { logout } = useUserContext();

  return (
    <Button variant='primary' onClick={logout}>Log out</Button>
  );
}
