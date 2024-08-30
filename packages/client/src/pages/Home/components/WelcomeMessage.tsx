import React from 'react';

interface WelcomeMessageProps {
  message: string;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ message }) => {
  return <p className="text-lg mb-2">{message}</p>;
};
