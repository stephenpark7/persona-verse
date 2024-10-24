import type { FC, JSX, Key } from 'react';
import { Tweet as TweetProps } from '@schemas';
import { useGetTweetsQuery } from '@redux';
import { Tweet } from '@components';

export const Tweets: FC = (): JSX.Element => {
  const { data, isLoading } = useGetTweetsQuery();

  const renderTweets = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (!data) {
      return <p>Loading...</p>;
    }

    const tweets = data.slice(0, 5);

    return tweets.length === 0 ? (
      <p>No tweets found.</p>
    ) : (
      tweets.map((data: TweetProps, idx: Key) => (
        <Tweet
          key={idx}
          {...data}
        />
      ))
    );
  };

  return (
    <div
      data-testid="tweets"
      className="flex flex-col"
    >
      <span className="text-xl font-semibold mb-2">Tweets</span>
      {renderTweets()}
    </div>
  );
};
