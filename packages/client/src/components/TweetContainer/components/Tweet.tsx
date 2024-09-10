import React from 'react';
import moment from 'moment';
import { TweetData } from '@schemas';
import './Tweet.css';

type TweetProps = TweetData;

export const Tweet: React.FC<TweetProps> = ({ message, createdAt, User }) => {
  const username = User.username;
  // TODO: move to a utility function
  const tweetDate = moment(createdAt, 'YYYY-MM-DD').format('MMM D');

  return (
    <div className="tweet-container">
      <span
        aria-label="display-name"
        className="display-name"
      >
        {username}
      </span>
      <span
        aria-label="username"
        className="username"
      >
        @{username}
      </span>
      <span
        aria-label="date"
        className="date"
      >
        {tweetDate}
      </span>
      <br />
      <span
        aria-label="message"
        className="text"
      >
        {message}
      </span>
    </div>
  );
};
