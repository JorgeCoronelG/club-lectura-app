import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, tap } from "rxjs";
import { map } from "rxjs/operators";
import { SingleResponse } from "../../core/models/single-response";
import { UserSession } from "../../core/models/user-session";
import { EnvironmentService } from "../../core/services/environment.service";
import { UserSessionService } from "../../core/services/user-session.service";
import { UserModel } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl = '/auth';

  constructor(private environmentService: EnvironmentService,
              private userSessionService: UserSessionService,
              private http: HttpClient) {}

  public login(data: UserModel): Observable<UserSession> {
    const url = `${this.environmentService.environmentApi}${this._baseUrl}/login`;
    return this.http.post<SingleResponse<UserSession>>(url, data)
      .pipe(
        map(res => res.data!),
        tap(user => {
          // Se guarda información de token en localStorage
          this.userSessionService.setToken(user.token!);
        })
      );
  }
}
