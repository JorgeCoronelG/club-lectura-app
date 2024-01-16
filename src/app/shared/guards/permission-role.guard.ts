import { CanActivateFn, Router } from '@angular/router';
import { UserSessionService } from '@shared/services/user-session.service';
import { inject } from '@angular/core';

export function permissionRoleGuard(
  rolesId: number[]
): CanActivateFn {
  return (): boolean => {
    const userSessionService: UserSessionService = inject(UserSessionService);
    const router: Router = inject(Router);

    if (!userSessionService.user) {
      router.navigateByUrl('/dashboard');
      return false;
    }

    const authorize = rolesId.find(id => userSessionService.user.rolId === id);

    if (authorize == undefined) {
      router.navigateByUrl('/dashboard');
    }

    return authorize != undefined;
  }
}
