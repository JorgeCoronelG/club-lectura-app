import { Injectable } from '@angular/core';
import { UserSession } from '@shared/interfaces/user-session.interface';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private _apiToken = 'api-token';
  private _userSession!: UserSession;

  get apiToken(): string {
    return localStorage.getItem(this._apiToken) ?? '';
  }

  get user(): UserSession {
    return { ...this._userSession };
  }

  setUser(userSession: UserSession): void {
    this._userSession = userSession;
  }
}
