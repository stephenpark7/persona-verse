import React, { useState, useEffect, useCallback, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tweet from '../components/Tweet';
import API from '../lib/api';
import { UserContextHook } from '../contexts/UserContext';

export default function TweetContainer() {
  const { userData, isLoggedIn } = UserContextHook();

  const [ postTweetMessage, setPostTweetMessage ] = useState('');
  const [ tweetData, setTweetData ] = useState(undefined);

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [ isLoggedIn ]);

  async function fetchData() {
    const result = await API.getTweets(userData.accessToken);
    if (result.error) {
      console.log('API error');
    } else if (result.data) {
      setTweetData(result.data);
    } else {
      console.log('Unexpected error');
    }
  }

  function handlePostTweetTextInputChange(e) {
    setPostTweetMessage(e.target.value);
  }

  async function handlePostTweet() {
    if (postTweetMessage.length === 0) return;
    const result = await API.postTweet(userData.accessToken, {
      message: postTweetMessage,
    });
    if (result.error) {
      console.log('API error');
    } else if (result.data) {
      setPostTweetMessage('');
      const newTweet = result.data;
      newTweet.User = {
        username: userData.username,
        display_name: userData.display_name,
      }
      setTweetData([ newTweet, ...tweetData ]);
    } else {
      console.log('Unexpected error');
    }
  }

  return (
    <Form>
      <Form.Group className='mt-3 mb-3'>
        <Form.Control type='text' name='username' placeholder={'What\'s happening?'}
          value={postTweetMessage} onChange={handlePostTweetTextInputChange} required />
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
