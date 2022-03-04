import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { UserSessionService } from "../services/user-session.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private userSessionService: UserSessionService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.existToken();
  }

  private existToken(): boolean {
    const token = this.userSessionService.token;
    if (token.length > 0) {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
    return true;
  }
}
