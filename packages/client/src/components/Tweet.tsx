import React from 'react';
import moment from 'moment';
import { TweetProps } from '@interfaces';
import './Tweet.css';

export const Tweet: React.FC<TweetProps> = ({ message, createdAt, User }) => {
  const username = User.username;
  const tweetDate = moment(createdAt, 'YYYY-MM-DD').format('MMM D');
  const text = message;

  return (
    <div className="tweet-container">
      <span className="display-name">{username}</span>
      <span className="username">@{username}</span>
      <span className="date">{tweetDate}</span>
      <br />
      <span className="text">{text}</span>
    </div>
  );
};
