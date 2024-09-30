import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '@services';

export const LogoutButton: FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout({
      navigateFunction: navigate,
      options: { showToast: true },
    });
  };

  return (
    <div
      data-testid="logout-button"
      onClick={handleLogout}
    >
      Log out
    </div>
  );
};
