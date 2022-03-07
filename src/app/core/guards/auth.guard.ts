import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  Router
} from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import { map } from "rxjs/operators";
import { UserSessionService } from "../services/user-session.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private userSessionService: UserSessionService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> {
    return this.isAuthenticated();
  }

  canLoad(route: Route,segments: UrlSegment[]): Observable<boolean> {
    return this.isAuthenticated();
  }

  private isAuthenticated(): Observable<boolean> {
    if (this.userSessionService.user.id) {
      return of(true);
    }

    return this.userSessionService.getUserSession()
      .pipe(
        map(() => true),
        catchError(() => of(false)),
        tap((isAuthenticated) => {
          if (!isAuthenticated) {
            this.userSessionService.removeToken();
            this.userSessionService.clearUser();
            this.router.navigateByUrl('/auth/login');
          }
        })
      );
  }
}
