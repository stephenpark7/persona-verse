import React from 'react';
import moment from 'moment';
// import { TrashFill } from 'react-bootstrap-icons';
import './Tweet.css';
import { TweetParams } from '../interfaces';
const Tweet: React.FC<TweetParams> = ({ 
  message, 
  createdAt, 
  User,
}) => {

  const displayName = User.displayName;
  const username = User.username;
  const tweetDate = moment(createdAt, 'YYYY-MM-DD').format('MMM D');
  const text = message;

  return (
    <div className='tweet-container'>
      <span className='display-name'>{displayName}</span>
      <span className='username'>@{username}</span>
      <span className='date'>{tweetDate}</span><br />
      <span className='text'>{text}</span>
    </div>
  )
};

export default Tweet;
