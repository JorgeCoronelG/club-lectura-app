import { CanActivateChildFn } from '@angular/router';
import { UserSessionService } from '@shared/services/user-session.service';
import { inject } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { catchError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export function authGuard(): CanActivateChildFn {
  return (): Observable<boolean> => {
    const userSessionService: UserSessionService = inject(UserSessionService);
    const authService: AuthService = inject(AuthService);

    if (userSessionService.user.id) {
      return of(true);
    }

    return authService.getUserSession().pipe(
      map(() => true),
      catchError(() => of(false))
    );
  };
}
