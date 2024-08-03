import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { TweetData } from '../../src/interfaces/api';
import { useUserState } from '../stores';
import { getTweets, postTweet } from '../api';
import { Tweet } from './Tweet';
import { JWT } from '../../src/interfaces';

import { useGetTweetsQuery } from '../services/TweetAPI';

export const TweetContainer = () => {
  const { jwt, isLoggedIn, tweets } = useUserState();
  return (
    <BaseTweetContainer 
      jwt={jwt}
      isLoggedIn={isLoggedIn}
      tweets={tweets}
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

  const { error, data, isLoading } = useGetTweetsQuery();

  async function handlePostTweet() {
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
  }

  function renderTweets(): React.ReactNode {
    // if (error) {
    //   return <p>Error: {error.message}</p>;
    // }
    if (isLoading || !data) {
      return <p>Loading...</p>;
    }
    return data.map((data: TweetData, idx: React.Key) =>
      <Tweet 
        key={idx}
        {...data}
      />,
    );
  }

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
