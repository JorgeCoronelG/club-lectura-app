import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, switchMap, tap } from 'rxjs';
import { UserSession } from '@shared/interfaces/user-session.interface';
import { UserSessionService } from '@shared/services/user-session.service';
import { Usuario } from '@shared/models/usuario.model';
import { NavigationService } from '@shared/services/navigation.service';
import { map } from 'rxjs/operators';
import { NavigationDropdown, NavigationLink } from '@shared/navigation/navigation-item.interface';
import { MenuLoaderService } from '@shared/navigation/menu-loader.service';
import { VexConfigService } from '@shared/config/vex-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl = 'auth/';

  private http: HttpClient = inject(HttpClient);
  private userSessionService: UserSessionService = inject(UserSessionService);
  private navigationService: NavigationService = inject(NavigationService);
  private menuLoaderService: MenuLoaderService = inject(MenuLoaderService);
  private vexConfigService: VexConfigService = inject(VexConfigService);

  get url(): string {
    return environment.baseUrl + this._baseUrl;
  }

  getUserSession(): Observable<void> {
    const url = `${this.url}user`;
    return this.http.get<UserSession>(url).pipe(
      tap(user => this.userSessionService.setUser(user)),
      switchMap(() => this.navigationService.getNavigationMenu()),
      map<Array<NavigationLink | NavigationDropdown>, void>(menus => {
        this.menuLoaderService.loadNavigation(menus);
      })
    );
  }

  login(data: Partial<Usuario>): Observable<void> {
    const url = `${this.url}login`;
    return this.http.post<UserSession>(url, data).pipe(
      tap(user => {
        this.userSessionService.setApiToken(user.token);
        this.userSessionService.setUser(user);

        if (data.rememberMe) {
          this.userSessionService.setCredentials(data);
        } else {
          this.userSessionService.removeCredentials();
        }
      }),
      switchMap(() => this.navigationService.getNavigationMenu()),
      map<Array<NavigationLink | NavigationDropdown>, void>(menus => {
        this.menuLoaderService.loadNavigation(menus);
      })
    );
  }

  restorePassword(user: Partial<Usuario>): Observable<void> {
    const url = `${this.url}restore-password`;
    return this.http.patch<void>(url, user);
  }

  logout(): Observable<void> {
    const url = `${this.url}logout`;
    return this.http.get<void>(url).pipe(
      tap(() => {
        this.userSessionService.removeToken();
        this.userSessionService.clearUser();
        this.menuLoaderService.loadDefaultNavigation();
        this.vexConfigService.removeTemplateConfig();
      })
    );
  }

  changePassword(user: Partial<Usuario>): Observable<void> {
    const url = `${this.url}change-password`;
    return this.http.patch<void>(url, user);
  }
}
