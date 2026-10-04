import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const allowedRoles: string[] = route.data['roles'] ?? [];
  const user = auth.currentUser();
  if (user && allowedRoles.includes(user.role)) return true;
  return router.createUrlTree(['/auth/login']);
};
