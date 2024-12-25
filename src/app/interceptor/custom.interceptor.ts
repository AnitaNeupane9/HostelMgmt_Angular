import { HttpInterceptorFn } from '@angular/common/http';
import {throwError} from 'rxjs';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  debugger;
  const authService = inject(AuthService);
  const localToken = localStorage.getItem('token');
  const excludedEndpoints = ['/login', '/register']; // List of endpoints to exclude

  // Skip the interceptor for excluded endpoints
  for (const endpoint of excludedEndpoints) {
    if (req.url.includes(endpoint)) {
      return next(req);
    }
  }

  // If token exists, check expiration
  if (localToken) {
    if (authService.isTokenExpired()) {
      authService.logout();
      return throwError('Token expired');
    }

    // If token is valid, attach the Authorization header to the request
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localToken}`,
      },
    });

    return next(clonedReq);
  }
  return next(req);
};
