import React from 'react';
import moment from 'moment';
import { TweetData } from '@schemas';
import './Tweet.css';

export const Tweet: React.FC<TweetData> = ({ message, createdAt, User }) => {
  const username = User.username;
  const tweetDate = moment(createdAt, 'YYYY-MM-DD').format('MMM D');

  return (
    <div className="tweet-container">
      <span className="display-name">{username}</span>
      <span className="username">@{username}</span>
      <span className="date">{tweetDate}</span>
      <br />
      <span className="text">{message}</span>
    </div>
  );
};
