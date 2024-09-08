import { FC } from 'react';
import { z } from 'zod';

const labelSchema = z.string();

type Label = z.infer<typeof labelSchema>;

interface InputProps {
  label: Label;
}

export const Label: FC<InputProps> = ({ label }) => {
  labelSchema.parse(label);

  return (
    <label
      className="min-w-32"
      htmlFor={label}
    >
      {label}
    </label>
  );
};
