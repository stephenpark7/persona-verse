import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tweet from './Tweet';
import API from '../api';
import { useUserContext } from '../contexts/UserContext';
import { useOnMountUnsafe } from '../hooks';
import { toast } from 'react-toastify';
import { TweetParamsData } from '../interfaces';

export default function TweetContainer() {
  const textRef = React.useRef<HTMLInputElement>(null);
  const { userData, isLoggedIn } = useUserContext();
  const [ tweetData, setTweetData ] = useState<TweetParamsData>(null);

  useOnMountUnsafe(fetchData);

  async function fetchData() {
    if (!isLoggedIn) return;

    await API.getTweets(userData, setTweetData);
  }

  async function handlePostTweet() {
    if (!isLoggedIn || !userData) return;

    const message = textRef.current?.value;

    if (!message || message.length === 0) {
      toast.error('Please enter a message');
      return;
    }

    textRef.current.value = '';

    await API.postTweet(userData, {
      message: message,
    }, tweetData, setTweetData);
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
      {tweetData && tweetData.map((data, idx) =>
        <Tweet 
          key={idx} 
          {...data}
        />,
      )}
    </Form>
  );
}