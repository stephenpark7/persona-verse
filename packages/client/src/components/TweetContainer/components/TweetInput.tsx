import React from 'react';

interface TweetInputProps {
  textRef: React.RefObject<HTMLInputElement>;
}

export const TweetInput: React.FC<TweetInputProps> = ({ 
  textRef, 
}): React.JSX.Element => {
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
