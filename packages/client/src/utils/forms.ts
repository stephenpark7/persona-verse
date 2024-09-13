import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import {
  requestBody,
  RequestBody,
  SubmitFormFunction,
  SubmitFormFunctionArgs,
} from '@schemas';

export const submitForm: SubmitFormFunction = async ({
  e,
  formData,
  apiFunction,
  navigate,
  options,
}: SubmitFormFunctionArgs): Promise<void> => {
  e.preventDefault();

  requestBody.parse(formData);

  await apiFunction({ formData, navigateFunction: navigate, options });
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
