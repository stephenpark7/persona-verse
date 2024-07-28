import { RequestBody } from '../../src/interfaces';
import { SubmitForm } from '../../src/interfaces/api';
import { JWT, StateProperties } from '../../src/interfaces/user';
import { setJwt, store } from '../../src/stores';


export function setLocalStorageToken(
  state: StateProperties,
): void {
  if (state.jwt === null) {
    const token = localStorage.getItem('jwt');
    if (token) {
      const jwt: JWT = JSON.parse(token);
      store.dispatch(setJwt(jwt));
    }
  }
}

export async function submitForm({
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

export function isTokenRefreshablePath(url: string) {
  const ignoredPaths = [
    '/api/users/signup',
    '/api/users/login',
    '/api/users/logout',
    '/api/refresh',
  ];

  return url.includes('/api/') && !ignoredPaths.some(path => url.endsWith(path));
}
