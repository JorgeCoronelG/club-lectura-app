import { Injectable } from '@angular/core';
import { UserSession } from '@shared/interfaces/user-session.interface';
import { Usuario } from '@shared/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private _apiToken = 'api-token';
  private _userSession!: UserSession;
  private _credentials = 'credentials';

  get apiToken(): string {
    return localStorage.getItem(this._apiToken) ?? '';
  }

  get user(): UserSession {
    return { ...this._userSession };
  }

  get credentials(): Usuario | null {
    const credentials = localStorage.getItem(this._credentials);
    return (credentials === null) ? null : JSON.parse(credentials);
  }

  setUser(userSession: UserSession): void {
    this._userSession = userSession;
  }

  setApiToken(token: string): void {
    localStorage.setItem(this._apiToken, token);
  }

  setCredentials(user: Partial<Usuario>): void {
    localStorage.setItem(this._credentials, JSON.stringify(user));
  }

  removeCredentials(): void {
    localStorage.removeItem(this._credentials);
  }

  removeToken(): void {
    localStorage.removeItem(this._apiToken);
  }

  clearUser(): void {
    this._userSession = <UserSession>{};
  }
}
