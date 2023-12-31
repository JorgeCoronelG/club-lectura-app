import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private _apiToken = 'api-token';

  get apiToken(): string {
    return localStorage.getItem(this._apiToken) ?? '';
  }
}
