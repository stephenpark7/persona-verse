import type { Jwt } from '@shared/types';

export class Session {
  refreshToken: Jwt;

  public constructor() {
    this.refreshToken = null;
  }

  public clearSession(): void {
    this.refreshToken = null;
  }

  public setRefreshToken(token: Jwt): void {
    this.refreshToken = token;
  }

  public getRefreshToken(): Jwt {
    return this.refreshToken;
  }
}

export const session = new Session();
