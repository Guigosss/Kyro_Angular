import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

//- Controls the access to the routes of your application
export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const _authService: AuthService = inject(AuthService);
  const _router: Router = inject(Router);

  if(!_authService.connectedUser()){
    return _router.createUrlTree(['/login']);
  }

  return true;
};
