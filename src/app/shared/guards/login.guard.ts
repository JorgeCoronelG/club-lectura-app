import { CanActivateChildFn, Router } from '@angular/router';
import { UserSessionService } from '@shared/services/user-session.service';
import { inject } from '@angular/core';

export function loginGuard(): CanActivateChildFn {
  return () => {
    const userSessionService: UserSessionService = inject(UserSessionService);
    const router: Router = inject(Router);

    if (userSessionService.apiToken.length > 0) {
      router.navigateByUrl('/dashboard');
      return false;
    }

    return true;
  };
}
