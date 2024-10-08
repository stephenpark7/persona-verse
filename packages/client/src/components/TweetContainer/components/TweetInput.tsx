import type { FC, JSX } from 'react';

interface TweetInputProps {
  state: [string, React.Dispatch<React.SetStateAction<string>>];
  onPostTweet: () => void;
}

export const TweetInput: FC<TweetInputProps> = ({
  state,
  onPostTweet,
}): JSX.Element => {
  const [value, setValue] = state;

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onPostTweet();
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return (
    <div
      data-testid="tweet-input"
      className="mt-3 mb-3"
    >
      <input
        className="border border-black rounded w-80 h-9 p-2"
        type="text"
        placeholder={"What's happening?"}
        value={value}
        onChange={handleOnChange}
        onKeyUp={handleKeyUp}
        required
      />
    </div>
  );
};
