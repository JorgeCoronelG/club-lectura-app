import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, tap } from "rxjs";
import { map } from "rxjs/operators";
import { SingleResponse } from "../models/single-response";
import { UserSession } from "../models/user-session";
import { EnvironmentService } from "./environment.service";

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private _baseUrl: string = '/auth';
  private _apiToken: string = 'api-token';
  private _userSession!: UserSession;

  constructor(private environmentService: EnvironmentService,
              private http: HttpClient) {}

  get user(): UserSession {
    return { ...this._userSession };
  }

  get token(): string {
    return localStorage.getItem(this._apiToken) || '';
  }

  get url(): string {
    return `${this.environmentService.environmentApi}${this._baseUrl}`;
  }

  public setUser(userSession: UserSession) {
    this._userSession = userSession;
  }

  public setToken(token: string) {
    localStorage.setItem(this._apiToken, token);
  }

  public removeToken(): void {
    localStorage.removeItem(this._apiToken);
  }

  public clearUser(): void {
    this._userSession = <UserSession>{};
  }

  public logout(): Observable<any> {
    const url = `${this.url}/logout`;
    return this.http.get(url);
  }

  public getUserSession(): Observable<UserSession> {
    const url = `${this.url}/user`;
    return this.http.get<SingleResponse<UserSession>>(url)
      .pipe(
        map(res => res.data!),
        tap(user => this.setUser(user))
      );
  }
}
