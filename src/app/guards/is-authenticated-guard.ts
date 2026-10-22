import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

//- Controls the access to the routes of your application
export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const _authService: AuthService = inject(AuthService);
  const _router: Router = inject(Router);

  if(!_authService.connectedUser()){
    _router.navigate(['/login']);
    return false;
  }

  return true;
};
