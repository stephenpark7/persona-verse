import React from 'react';
import { TweetData } from '@interfaces';
import { useGetTweetsQuery } from '@redux';
import { Tweet } from '@components';

export const Tweets: React.FC = (): React.JSX.Element => {
  const { data, isLoading } = useGetTweetsQuery();

  const renderTweets = () => {
    if (isLoading || !data) {
      return <p>Loading...</p>;
    }

    return data?.slice(0, 5).map((data: TweetData, idx: React.Key) => (
      <Tweet
        key={idx}
        {...data}
      />
    ));
  };

  return (
    <div className="flex flex-col ">
      <span className="font-bold">Tweets</span>
      {renderTweets()}
    </div>
  );
};
