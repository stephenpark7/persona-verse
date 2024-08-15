import { NavigateFunction } from 'react-router-dom';
import { ApiFunction, RequestBody } from '.';

export interface SubmitForm {
  e: React.FormEvent<HTMLFormElement>,
  formData: RequestBody,
  apiFunction: ApiFunction,
  navigate: NavigateFunction,
}
