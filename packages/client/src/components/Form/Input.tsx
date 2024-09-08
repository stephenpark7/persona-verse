import { ChangeEvent, FC } from 'react';
import { z } from 'zod';

const InputPropsSchema = z.object({
  label: z.string(),
  type: z.string(),
  value: z.string().optional(),
  formDataState: z.object({
    formData: z.object({
      username: z.string().optional(),
      email: z.string().optional(),
      password: z.string().optional(),
    }),
    setFormData: z
      .function()
      .args(
        z.object({
          username: z.string().optional(),
          email: z.string().optional(),
          password: z.string().optional(),
        }),
      )
      .returns(z.void()),
  }),
});

type InputProps = z.infer<typeof InputPropsSchema>;

export const Input: FC<InputProps> = ({
  label,
  type,
  value,
  formDataState,
}) => {
  InputPropsSchema.parse({ label, type, value, formDataState });

  const { formData, setFormData } = formDataState;

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
      name={label}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
      className="border border-gray-300 rounded-md"
    />
  );
};
