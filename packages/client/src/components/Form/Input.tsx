import { requestBody } from '@schemas';
import { ChangeEvent, FC } from 'react';
import { z } from 'zod';

const inputProps = z.object({
  label: z.string(),
  type: z.string(),
  value: z.string().optional(),
  formDataState: z.object({
    formData: requestBody,
    setFormData: z.function().args(requestBody).returns(z.void()),
  }),
});

type InputProps = z.infer<typeof inputProps>;

export const Input: FC<InputProps> = ({
  label,
  type,
  value,
  formDataState,
}) => {
  inputProps.parse({ label, type, value, formDataState });

  const { formData, setFormData } = formDataState;

  requestBody.parse(formData);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name.toLowerCase()]: value,
    });
  };

  return (
    <input
      aria-label={label}
      type={type}
      name={label.toLowerCase()}
      value={value}
      autoComplete={label.toLowerCase()}
      onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
      className="border border-gray-300 rounded-md p-2 w-full"
    />
  );
};
