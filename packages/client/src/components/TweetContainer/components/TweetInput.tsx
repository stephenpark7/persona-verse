import React from 'react';

interface TweetInputProps {
  inputRef: {
    tweetInput: string;
    setTweetInput: React.Dispatch<React.SetStateAction<string>>;
  }
}

export const TweetInput: React.FC<TweetInputProps> = ({ inputRef: { tweetInput, setTweetInput } }): React.JSX.Element => {
  return (
    <div className='mt-3 mb-3'>
      <input
        className='border border-black rounded w-96 h-9 p-2'
        type='text' 
        placeholder={'What\'s happening?'}
        value={tweetInput}
        onChange={(e) => setTweetInput(e.target.value)}
        required
      />
    </div>
  );
};
