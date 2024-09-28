import { RequestBody } from '@schemas';
import { Input, Label } from '../../components/Form';
import { FC, FormEvent } from 'react';
import { Button } from '@components';

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
      className="mb-4"
      onSubmit={handleFormSubmit}
    >
      <div className="flex flex-col gap-3">
        <div className="flex">
          <Label label="Username" />
          <Input
            label="Username"
            type="text"
            value={formData.username}
            formDataState={{ formData, setFormData }}
          />
        </div>
        {type === 'login' ? null : (
          <div className="flex">
            <Label label="Email" />
            <Input
              label="Email"
              type="text"
              value={formData.email}
              formDataState={{ formData, setFormData }}
            />
          </div>
        )}
        <div className="flex mb-2">
          <Label label="Password" />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            formDataState={{ formData, setFormData }}
          />
        </div>
        {type === 'login' ? (
          <Button
            name="form-login"
            overrideCSS="w-full"
            aria-label="Log in"
            type="submit"
          >
            Log in
          </Button>
        ) : (
          <Button
            name="form-signup"
            overrideCSS="w-full"
            aria-label="Sign up"
            type="submit"
          >
            Create account
          </Button>
        )}
      </div>
    </form>
  );
};
