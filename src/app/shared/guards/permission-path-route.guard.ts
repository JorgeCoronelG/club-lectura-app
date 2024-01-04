import { CanActivateFn, Router } from '@angular/router';
import { NavigationService } from '@shared/services/navigation.service';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

export function permissionPathRouteGuard(pathRoute: string): CanActivateFn {
  return (): Observable<boolean> => {
    const navigationService: NavigationService = inject(NavigationService);
    const router: Router = inject(Router);

    return navigationService.hasPermission(pathRoute).pipe(
      tap(hasPermission => {
        if (!hasPermission) {
          router.navigateByUrl('/dashboard');
        }
      })
    );
  };
}
