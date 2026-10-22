import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequestDto } from '../../models/login-request-dto';

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);
  private readonly _authService: AuthService = inject(AuthService);

  readonly errorMessage = signal<string | null>(null);

  loginForm: FormGroup = this._fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor() {}

  submit(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    this._authService.login(this.loginForm.value as LoginRequestDto).subscribe({
      next: () => {
        this.errorMessage.set(null);
        this._router.navigate(['/home']);
      },
      error: () => {
        this.errorMessage.set('Login failed');
      },
    });
  }
}
