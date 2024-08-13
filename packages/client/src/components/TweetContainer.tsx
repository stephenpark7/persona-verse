import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { TweetData } from '../interfaces';
import { postTweet } from '../api';
import { useUserState } from '../hooks';
import { useGetTweetsQuery } from '../redux';
import { Tweet } from './Tweet';
import { JWT } from '@shared/types';

export const TweetContainer = () => {
  const { jwt, tweets, isLoggedIn } = useUserState();
  return (
    <BaseTweetContainer 
      {...{ jwt, tweets, isLoggedIn }}
    />
  );
};

interface TweetContainerProps {
  jwt: JWT | null;
  isLoggedIn: boolean;
  tweets: TweetData[] | null;
};

const BaseTweetContainer: React.FC<TweetContainerProps> = ({ 
  jwt,
  isLoggedIn,
  tweets,
}): React.JSX.Element => {
  const textRef = React.useRef<HTMLInputElement>(null);
  const { data, isLoading, refetch } = useGetTweetsQuery();

  // TODO: refactor using tags with RTK Query
  useEffect(() => {
    refetch();
  }, [ tweets ]);

  const handlePostTweet = async () => {
    if (!isLoggedIn) return;

    const message = textRef.current?.value;

    if (!message || message.length === 0) {
      toast.error('Please enter a message');
      return;
    }

    textRef.current.value = '';

    await postTweet({
      jwt: jwt,
      payload: { message: message },
    });
  };

  const renderTweets = (): React.ReactNode => {
    if (isLoading || !data) {
      return <p>Loading...</p>;
    }
    return data?.slice(0, 5).map((data: TweetData, idx: React.Key) =>
      <Tweet 
        key={idx}
        {...data}
      />,
    );
  };

  return (
    <Form>
      <Form.Group className='mt-3 mb-3'>
        <Form.Control ref={textRef} type='text' name='username' placeholder={'What\'s happening?'}
          defaultValue={''} required />
      </Form.Group>
      <Button variant="primary" onClick={handlePostTweet}>Tweet</Button>
      <br /><br />
      <h2>Tweets</h2>
      {renderTweets()}
    </Form>
  );
};
