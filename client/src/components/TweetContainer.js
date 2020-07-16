import React, { useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default function TweetContainer({ userData }) {

  const [tweetMessage, setTweetText] = useState('');
  const [tweetData, setTweetData] = useState(null);

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
        'x-access-token': userData.accessToken
      }, 
      data: {
        message: tweetMessage
      }
    }).then(res => {
      setTweetText('');
      // update / refresh page
      fetchData();
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
        'x-access-token': userData.accessToken
      }      
    }).then(res => {
      //console.log(res.data);
      setTweetData(res.data);
    }).catch(err => {
      console.log(err);
    });
  }, [userData]);

  useEffect(() => {
    if (userData) {
      fetchData();
    }
  }, [userData, fetchData]);

  return (
    <Form>
      <Form.Group className='mt-3 mb-3'>
        <Form.Control type='text' name='username' placeholder={"What's happening?"} 
                      value={tweetMessage} onChange={handleChange} required />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmitTweet}>Tweet</Button>

      <br /><br />
      <h2>Tweets</h2>
      <ul>
        {tweetData && tweetData.map((tweet, idx) => 
          <li key={idx}>{tweet.message} - Likes: {tweet.likes}</li>
        )}
      </ul>

    </Form>
  );
}