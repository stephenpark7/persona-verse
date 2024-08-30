import { NavigateFunction } from 'react-router-dom';
import { RequestBody } from '.';

export interface RegisterParams {
  formData: RequestBody;
  navigate: NavigateFunction;
  showToast?: boolean | undefined;
  autoLogin?: boolean | undefined;
}

export interface LoginParams {
  formData: RequestBody;
  navigate: NavigateFunction;
  showToast?: boolean | undefined;
}

export type RegisterFunction = (params: RegisterParams) => Promise<boolean>;

export type LoginFunction = (params: LoginParams) => Promise<boolean>;

export type ApiFunction = ({
  ...args
}: RegisterParams | LoginParams) => Promise<boolean>;
