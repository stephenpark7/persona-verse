import { FC } from 'react';
import { Button } from '@components';

export const Buttons: FC = () => {
  return (
    <div className="flex gap-2">
      <Button
        name="sign-up"
        link="/signup"
      >
        Sign up
      </Button>
      <Button
        name="log-in"
        link="/login"
      >
        Log in
      </Button>
    </div>
  );
};
