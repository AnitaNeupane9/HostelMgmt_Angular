import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const authService =  inject(AuthService);
  const router = inject(Router);
  const expectedRoles: string[] = route.data['roles'];

  const userRole = authService.getRole();
  if (expectedRoles && expectedRoles.includes(userRole)) {
    return true;
  }

  alert('Unauthorized.')
  router.navigate(['/landingPage']);
  return false;
};
