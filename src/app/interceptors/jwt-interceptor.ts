import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

//- An Angular interceptor intercepts HTTP requests to add the JWT to the Authorization header, allowing the backend to authenticate requests.
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: AuthService = inject(AuthService);
  const token = authService.connectedUser()?.accessToken;

  if (token) {
    let clone = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(clone);
  }

  return next(req);
};
