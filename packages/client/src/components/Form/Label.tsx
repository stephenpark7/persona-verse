import type { FC } from 'react';
import { z } from 'zod';

const labelSchema = z.string();

type Label = z.infer<typeof labelSchema>;

interface InputProps {
  value: Label;
}

export const Label: FC<InputProps> = ({ value }) => {
  labelSchema.parse(value);

  return (
    <label
      className="min-w-28 font-medium"
      htmlFor={value}
    >
      {value}
    </label>
  );
};
