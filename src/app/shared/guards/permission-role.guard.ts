import { CanActivateFn } from '@angular/router';
import { UserSessionService } from '@shared/services/user-session.service';
import { inject } from '@angular/core';

export function permissionRoleGuard(
  rolesId: number[]
): CanActivateFn {
  return (): boolean => {
    const userSessionService: UserSessionService = inject(UserSessionService);

    if (!userSessionService.user) {
      return false;
    }

    const authorize: number | undefined = rolesId.find(id => userSessionService.user.rol.id === id);

    return authorize != undefined;
  }
}
