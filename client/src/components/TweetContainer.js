import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tweet from '../components/Tweet';
import API from '../lib/api';
import { useUserContext } from '../contexts/UserContext';
import { useOnMountUnsafe } from '../utils';
import { toast } from 'react-toastify';

export default function TweetContainer() {
  const textRef = React.useRef(null);
  const { userData, isLoggedIn } = useUserContext();

  const [ tweetData, setTweetData ] = useState(undefined);

  useOnMountUnsafe(fetchData);

  async function fetchData() {
    if (!isLoggedIn) return;
    const result = await API.getTweets(userData.token);
    if (result) {
      setTweetData(result.data);
    }
  }

  async function handlePostTweet() {
    const message = textRef.current.value;

    if (message.length === 0) return;

    const result = await API.postTweet(userData.token, {
      message: message,
    });
    if (result) {
      textRef.current.value = '';
      const newTweet = result.data;
      newTweet.User = {
        username: userData.payload.username,
        displayName: userData.payload.displayName, // TODO: display name
      }
      setTweetData([ newTweet, ...tweetData ]);
      toast.success('Tweet posted');
    } else {
      toast.error('Failed to post tweet');
    }
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
        <Tweet key={idx} data={data} />,
      )}
    </Form>
  );
}
