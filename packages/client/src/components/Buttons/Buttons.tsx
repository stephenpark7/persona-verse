import type { FC } from 'react';
import { Button } from '@components';

export const Buttons: FC = () => {
  return (
    <div className="flex gap-2">
      <Button
        name="signup"
        link="/signup"
      >
        {'Sign up'}
      </Button>
      <Button
        name="login"
        link="/login"
      >
        {'Log in'}
      </Button>
    </div>
  );
};
