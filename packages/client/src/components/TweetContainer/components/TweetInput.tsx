import React from 'react';

interface TweetInputProps {
  tweetInputState: [ string, React.Dispatch<React.SetStateAction<string>> ];
}

export const TweetInput: React.FC<TweetInputProps> = ({ tweetInputState }): React.JSX.Element => {
  const [ tweetInput, setTweetInput ] = tweetInputState;
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
