import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { TweetData } from 'src/interfaces/api';
import { useUserState } from '../stores';
import { getTweets, postTweet } from '../api';
import { Tweet } from './Tweet';

export const TweetContainer: React.FC = (): React.JSX.Element => {
  const textRef = React.useRef<HTMLInputElement>(null);

  const [ tweetData, setTweetData ] = useState<TweetData[]>([]);

  const { jwt, isLoggedIn } = useUserState();

  useEffect(() => {
    async function fetchData() {
      if (!isLoggedIn) return;

      await getTweets(setTweetData);
    }

    fetchData();
    
    return () => {
      setTweetData([]);
    };
  }, []);

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
      tweetData,
      setTweetData,
    });
  }

  function renderTweets(): React.ReactNode | null {
    if (!tweetData) return null;
    return tweetData.map((data: TweetData, idx: React.Key) =>
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
