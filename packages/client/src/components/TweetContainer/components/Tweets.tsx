import { FC, JSX, Key } from 'react';
import { Tweet as TweetProps } from '@schemas';
import { useGetTweetsQuery } from '@redux';
import { Tweet } from '@components';

export const Tweets: FC = (): JSX.Element => {
  const { data, isLoading } = useGetTweetsQuery();

  const renderTweets = () => {
    if (isLoading || !data) {
      return <p>Loading...</p>;
    }

    const tweets = data?.slice(0, 5);

    if (!tweets.length) {
      return <p>No tweets found.</p>;
    }

    return tweets.map((data: TweetProps, idx: Key) => (
      <Tweet
        key={idx}
        {...data}
      />
    ));
  };

  return (
    <div className="flex flex-col ">
      <span className="text-xl font-semibold mb-2">Tweets</span>
      {renderTweets()}
    </div>
  );
};
