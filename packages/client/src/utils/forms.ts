import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import {
  requestBody,
  RequestBody,
  SubmitFormFunction,
  submitFormFunction,
} from '@schemas';

export const submitForm: SubmitFormFunction = async (
  e,
  formData,
  apiFunction,
  navigate,
  options,
): Promise<void> => {
  e.preventDefault();

  submitFormFunction.parse([e, formData, apiFunction, navigate, options]);

  await apiFunction(formData, navigate, options);
};

export const updateForm = (
  e: ChangeEvent<HTMLInputElement>,
  formData: RequestBody,
  setFormData: Dispatch<SetStateAction<RequestBody>>,
): void => {
  const { value, name } = e.target;

  requestBody.parse(formData);

  setFormData({
    ...formData,
    [name]: value,
  } as RequestBody);
};
