import React from 'react';
import { Button } from '@components';

export const Buttons: React.FC = () => {
  return (
    <div className="flex gap-2">
      <Button link="/signup">Sign up</Button>
      <Button link="/login">Log in</Button>
    </div>
  );
};
