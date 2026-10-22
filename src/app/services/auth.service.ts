import { inject, Injectable, Service, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserTokenResponseDto } from '../models/user-token-response-dto';
import { LoginRequestDto } from '../models/login-request-dto';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = `${environment.apiUrl}/login`;

  private readonly _http: HttpClient = inject(HttpClient);

  readonly connectedUser: WritableSignal<UserTokenResponseDto | undefined>;

  constructor() {
    const user = localStorage.getItem('connectedUser');
    this.connectedUser = signal(user ? JSON.parse(user) : undefined);
  }

  login(form: LoginRequestDto): Observable<UserTokenResponseDto> {
    return this._http
      .post<UserTokenResponseDto>(this.apiUrl, form)
      .pipe(
        tap((res) => {
          this.connectedUser.set(res);
          localStorage.setItem('connectedUser', JSON.stringify(res));
        }),
      );
  }

  logout(): void {
    this.connectedUser.set(undefined);
    localStorage.removeItem('connectedUser');
  }
}
