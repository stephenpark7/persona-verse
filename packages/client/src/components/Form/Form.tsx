import { RequestBody } from '@schemas';
import { type FC, FormEvent } from 'react';
import { Button } from '@components';
import { Input, Label } from './';

interface FormProps {
  type: 'login' | 'signup';
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  formData: RequestBody;
  setFormData: (data: RequestBody) => void;
}

export const Form: FC<FormProps> = ({
  type,
  handleFormSubmit,
  formData,
  setFormData,
}) => {
  return (
    <form
      aria-label="form"
      className="mb-4"
      onSubmit={handleFormSubmit}
    >
      <div className="flex flex-col gap-3">
        <div className="flex">
          <Label value="Username" />
          <Input
            type="text"
            label="Username"
            value={formData.username}
            formDataState={{ formData, setFormData }}
          />
        </div>
        {type === 'login' ? null : (
          <div className="flex">
            <Label value="Email" />
            <Input
              type="text"
              label="Email"
              value={formData.email}
              formDataState={{ formData, setFormData }}
            />
          </div>
        )}
        <div className="flex mb-2">
          <Label value="Password" />
          <Input
            type="password"
            label="Password"
            value={formData.password}
            formDataState={{ formData, setFormData }}
          />
        </div>
        {type === 'login' ? (
          <Button
            type="submit"
            name="form-login"
            overrideCSS="w-full"
          >
            Log in
          </Button>
        ) : (
          <Button
            type="submit"
            name="form-signup"
            overrideCSS="w-full"
          >
            Create account
          </Button>
        )}
      </div>
    </form>
  );
};
