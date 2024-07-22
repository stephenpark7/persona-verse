import { NavigateFunction } from 'react-router-dom';
import { RequestBody, SetUserData } from 'src/interfaces';
import { APIFunction } from 'src/interfaces/api';

export function getLocalStorageToken() {
  const token = localStorage.getItem('token');
  return token ? JSON.parse(token) : null;
}

export async function submitForm(
  e: React.FormEvent<HTMLFormElement>, 
  formData: RequestBody, 
  apiFunction: APIFunction, 
  setUserData: SetUserData, 
  navigate: NavigateFunction,
): Promise<void> {
  e.preventDefault();
  await apiFunction(formData, setUserData, navigate);
}

export function updateForm(
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
