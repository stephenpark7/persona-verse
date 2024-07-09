import React from 'react';
import moment from 'moment';
import { TrashFill } from 'react-bootstrap-icons';
import './Tweet.css';

export default function Tweet({ data }) {

  const displayName = data.User.display_name;
  const username = data.User.username;
  const tweetDate = moment(data.createdAt, 'YYYY-MM-DD').format('MMM D');
  const text = data.message;

  return (
    <div className='tweet-container'>
      <span className='display-name'>{displayName ?? username}</span>
      <span className='username'>@{username}</span>
      <span className='date'>{tweetDate}</span><br />
      <span className='text'>{text}</span>
    </div>
  )
}
