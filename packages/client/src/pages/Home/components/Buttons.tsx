import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@components';

export const Buttons: React.FC = () => {
  return (
    <div className="flex gap-2">
      <Link to="/signup">
        <Button>Sign up</Button>
      </Link>
      <Link to="/login">
        <Button>Log in</Button>
      </Link>
    </div>
  );
};
