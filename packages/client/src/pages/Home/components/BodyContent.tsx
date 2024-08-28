import React from 'react';

interface BodyContentProps {
  content: React.ReactNode;
}

export const BodyContent: React.FC<BodyContentProps> = ({ 
  content,
}) => {
  return (
    <div className='flex gap-2'>{content}</div>
  );
};
