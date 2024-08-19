import { RequestBody, SubmitForm } from '@interfaces';

async function submitForm({
  e,
  formData,
  apiFunction,
  navigate,
}: SubmitForm): Promise<void> {
  e.preventDefault();
  await apiFunction({
    formData,
    navigate,
  });
}

function updateForm(
  e: React.ChangeEvent<HTMLInputElement>,
  formData: RequestBody,
  setFormData: React.Dispatch<React.SetStateAction<RequestBody>>,
): void {
  const { value, name } = e.target;
  setFormData({
    ...formData,
    [ name ]: value,
  } as RequestBody);
}

export { submitForm, updateForm };
