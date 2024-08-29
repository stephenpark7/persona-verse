import React from 'react';

export const TweetInput: React.FC = (): React.JSX.Element => {
  const textRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className='mt-3 mb-3'>
      <input
        className='border border-black rounded w-96 h-9 p-2'
        ref={textRef} type='text' placeholder={'What\'s happening?'}
        defaultValue={''} required
      />
    </div>
  );
};
