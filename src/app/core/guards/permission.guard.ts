import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
  CanLoad,
  UrlSegment,
  Route
} from '@angular/router';
import { Role } from "../enums/role";
import { UserSessionService } from "../services/user-session.service";

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate, CanLoad {
  constructor(private userSessionService: UserSessionService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = route.data['roles'] as Role[];
    const authorize = this.isAuthorize(roles);
    if (!authorize) {
      this.router.navigateByUrl('/dashboard');
    }
    return authorize;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const roles = route.data!['roles'] as Role[];
    const authorize = this.isAuthorize(roles);
    if (!authorize) {
      this.router.navigateByUrl('/dashboard');
    }
    return authorize;
  }

  private isAuthorize(roles: Role[]): boolean {
    let authorize = false;
    this.userSessionService.user.roles?.forEach(rol => {
      if (roles.includes(rol.id)) {
        authorize = true;
      }
    });

    return authorize;
  }
}
