import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Tweet } from './Tweet';
import { getTweets, postTweet } from '../api';
import { useUserState } from '../stores';
import { useOnMountUnsafe } from '../hooks';
import { toast } from 'react-toastify';
import { TweetParams } from '../interfaces';

export const TweetContainer: React.FC = (): React.JSX.Element => {
  const textRef = React.useRef<HTMLInputElement>(null);
  const { userState, isLoggedIn } = useUserState();
  const [ tweetData, setTweetData ] = useState<TweetParams[]>([]);

  useOnMountUnsafe(fetchData);

  async function fetchData() {
    if (!isLoggedIn) return;
    
    await getTweets({
      userData: userState.jwt,
      setTweetData,
    });
  }

  async function handlePostTweet() {
    if (!isLoggedIn) return;

    const message = textRef.current?.value;

    if (!message || message.length === 0) {
      toast.error('Please enter a message');
      return;
    }

    textRef.current.value = '';

    await postTweet({
      userData: userState.jwt,
      payload: { message: message },
      tweetData,
      setTweetData,
    });
  }

  function renderTweets(): React.ReactNode | null {
    if (!tweetData) return null;
    return tweetData.map((data: TweetParams, idx: React.Key) =>
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
