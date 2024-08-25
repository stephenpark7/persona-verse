import React, { useMemo } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@components';
import { TweetData } from '@interfaces';
import { useUserState } from '@hooks';
import { useGetTweetsQuery, usePostTweetMutation } from '@redux';
import { Tweet } from '@components';

export const TweetContainer: React.FC = (): React.JSX.Element => {
  const textRef = React.useRef<HTMLInputElement>(null);
  const { jwt, isLoggedIn } = useUserState();
  const { data, isLoading } = useGetTweetsQuery();
  const [ postTweet ] = usePostTweetMutation();

  const handlePostTweet = async () => {
    if (!isLoggedIn) {
      return;
    }

    const message = textRef.current?.value;

    if (!message || message.length === 0) {
      toast.error('Please enter a message');
      return;
    }

    textRef.current.value = '';

    if (!jwt) {
      return;
    }

    postTweet({ jwt: jwt, payload: { message: message } });
  };
  
  const tweetsContent = useMemo(() => {
    if (isLoading || !data) {
      return <p>Loading...</p>;
    }

    return data?.slice(0, 5).map((data: TweetData, idx: React.Key) =>
      <Tweet 
        key={idx}
        {...data}
      />,
    );
  }, [ isLoading, data ]);

  return (
    <div>
      <div className='mt-3 mb-3'>
        <input
          className='border border-black rounded w-96 h-9 p-2'
          ref={textRef} type='text' placeholder={'What\'s happening?'}
          defaultValue={''} required
        />
      </div>
      <Button 
        extraStyles='mb-2'
        onClickEvent={handlePostTweet}
        width='w-20'
        height='h-9'
      >
        Tweet
      </Button>
      <div className='flex flex-col '>
        <span className='font-bold'>Tweets</span>
        {tweetsContent}
      </div>
    </div>
  );
};
