import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [RouterLink],
  selector: 'app-nav',
  styleUrl: './nav.scss',
  templateUrl: './nav.html',
})

export class Nav {
  protected readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
