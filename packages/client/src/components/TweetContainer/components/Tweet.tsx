import type { FC } from 'react';
import { Tweet as TweetProps } from '@schemas';
import { getMonthAndDay } from '@utils';

export const Tweet: FC<TweetProps> = ({ message, createdAt, User }) => {
  const username = User.username;
  const tweetDate = getMonthAndDay(createdAt);

  return (
    <div className="flex flex-col">
      <div>
        <span
          aria-label="display-name"
          className="font-bold"
        >
          {username}
        </span>
        <span
          aria-label="username"
          className="text-gray-500"
        >
          @{username}
        </span>
        <span
          aria-label="date"
          className="before:mr-1 before:content-['·'] ml-1 text-gray-500"
        >
          {tweetDate}
        </span>
      </div>
      <div>
        <span
          aria-label="message"
          className="text"
        >
          {message}
        </span>
      </div>
    </div>
  );
};
