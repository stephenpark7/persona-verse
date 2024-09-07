import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { register, login } from '@services';
import {
  UserSignupSchema,
  RequestBody,
  SubmitFormFunction,
  UserLoginSchema,
} from '@schemas';

export const submitForm: SubmitFormFunction = async (
  e,
  formData,
  apiFunction,
  navigate,
  options,
): Promise<void> => {
  e.preventDefault();

  // if (!formData) {
  //   throw new Error('Form data is undefined');
  // }

  // if (apiFunction === register) {
  //   UserSignupSchema.parse(formData);
  // } else if (apiFunction === login) {
  //   UserLoginSchema.parse(formData);
  // } else {
  //   throw new Error('Invalid API function');
  // }

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
