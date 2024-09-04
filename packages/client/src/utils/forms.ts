import { RequestBody, SubmitForm } from 'src/schemas';

export const submitForm = async ({
  e,
  formData,
  apiFunction,
  navigate,
}: SubmitForm): Promise<void> => {
  e.preventDefault();
  await apiFunction({
    formData,
    navigate,
  });
};

export const updateForm = (
  e: React.ChangeEvent<HTMLInputElement>,
  formData: RequestBody,
  setFormData: React.Dispatch<React.SetStateAction<RequestBody>>,
): void => {
  const { value, name } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  } as RequestBody);
};
