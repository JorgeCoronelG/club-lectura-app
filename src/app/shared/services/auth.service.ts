import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { UserSession } from '@shared/interfaces/user-session.interface';
import { UserSessionService } from '@shared/services/user-session.service';
import { Usuario } from '@shared/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl = 'auth/';

  private http: HttpClient = inject(HttpClient);
  private userSessionService: UserSessionService = inject(UserSessionService);

  get url(): string {
    return environment.baseUrl + this._baseUrl;
  }

  getUserSession(): Observable<UserSession> {
    const url = `${this.url}user`;
    return this.http.get<UserSession>(url).pipe(
      tap(user => this.userSessionService.setUser(user)),
      // TODO: falta por agregar el endpoint para la navegación por usuario
    );
  }

  restorePassword(user: Partial<Usuario>): Observable<void> {
    const url = `${this.url}restore-password`;
    return this.http.patch<void>(url, user);
  }
}
