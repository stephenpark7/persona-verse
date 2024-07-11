import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tweet from '../components/Tweet';
import API from '../lib/api';
import { UserContext } from '../UserContext';

export default function TweetContainer() {
  const userContext = useContext(UserContext);
  const { userData } = userContext;

  const [ tweetMessage, setTweetText ] = useState('');
  const [ tweetData, setTweetData ] = useState(null);

  function handleChange(e) {
    setTweetText(e.target.value);
  }

  async function handleSubmitTweet() {
    if (tweetMessage.length === 0) return;
    const result = await API.postTweet(userData.accessToken, {
      message: tweetMessage,
    });
    if (result.error) {
      console.log('API error');
    } else if (result.data) {
      setTweetText('');
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

  const fetchData = useCallback(async () => {
    const result = await API.getTweets(userData.accessToken);
    if (result.error) {
      console.log('API error');
    } else if (result.data) {
      setTweetData(result.data);
    } else {
      console.log('Unexpected error');
    }
  }, [ userData ]);

  useEffect(() => {
    if (userData) {
      fetchData();
    }
  }, [ userData, fetchData ]);

  return (
    <Form>
      <Form.Group className='mt-3 mb-3'>
        <Form.Control type='text' name='username' placeholder={'What\'s happening?'}
          value={tweetMessage} onChange={handleChange} required />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmitTweet}>Tweet</Button>

      <br /><br />
      <h2>Tweets</h2>
      {tweetData && tweetData.map((data, idx) =>
        <Tweet key={idx} data={data} />,
      )}

    </Form>
  );
}
