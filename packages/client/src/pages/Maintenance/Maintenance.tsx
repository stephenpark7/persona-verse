import { FC, useEffect } from 'react';

// TODO: should ping the server every 5 minutes to check if it's back up

export const Maintenance: FC = () => {
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        window.location.href = new URL('/', window.location.origin).href;
      },
      1000 * 60 * 5,
    );

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      <p>The server is currently down for maintenance.</p>
      <div style={{ height: '0.5rem' }}></div>
      <p>Please check back later.</p>
    </div>
  );
};
