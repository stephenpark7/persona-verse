import React, { useState, useEffect, useCallback, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import { UserContext } from '../UserContext';
import Tweet from '../components/Tweet';

export default function TweetContainer() {
  const userContext = useContext(UserContext);
  const { userData } = userContext;

  const [ tweetMessage, setTweetText ] = useState('');
  const [ tweetData, setTweetData ] = useState(null);

  function handleChange(e) {
    setTweetText(e.target.value);
  }

  function handleSubmitTweet() {
    if (tweetMessage.length === 0) return;
    axios({
      method: 'post',
      url: '/api/tweets/create',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': userData.accessToken,
      },
      data: {
        message: tweetMessage,
      },
    }).then(res => {
      setTweetText('');
      const newTweet = res.data;
      newTweet.User = {
        username: userData.username,
        display_name: userData.display_name,
      }
      console.log(newTweet);
      setTweetData([ ...tweetData, newTweet ]);
      //console.log(res.data);
      // update / refresh page
      //fetchData();
    }).catch(err => {
      console.log(err); //.response.data
    });
  }

  const fetchData = useCallback(() => {
    axios({
      method: 'get',
      url: '/api/tweets/get',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': userData.accessToken,
      },
    }).then(res => {
      const tweetData = res.data;
      console.log(tweetData);
      setTweetData(tweetData);
    }).catch(err => {
      console.log(err);
    });
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
