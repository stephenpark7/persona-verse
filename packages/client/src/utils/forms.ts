import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { register } from '@services';
import {
  RegisterFunctionSchema,
  RequestBody,
  SubmitFormFunction,
} from '@schemas';

export const submitForm: SubmitFormFunction = async (
  e,
  formData,
  apiFunction,
  navigate,
  options,
): Promise<void> => {
  e.preventDefault();

  // validate form data

  if (apiFunction === register) {
    RegisterFunctionSchema.parse(formData);
  }

  await apiFunction(formData, navigate, options);
};

export const updateForm = (
  e: ChangeEvent<HTMLInputElement>,
  formData: RequestBody,
  setFormData: Dispatch<SetStateAction<RequestBody>>,
): void => {
  const { value, name } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  } as RequestBody);
};
