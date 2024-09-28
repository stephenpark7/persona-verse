import { FC } from 'react';
import { Button } from '@components';

export const Buttons: FC = () => {
  return (
    <div className="flex gap-2">
      <Button link="/signup">Sign up</Button>
      <Button link="/login">Log in</Button>
    </div>
  );
};
