import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WorkoutSessionRequestDto } from '../models/workout-session-request-dto';
import { Observable } from 'rxjs';
import { WorkoutSessionResponseDto } from '../models/workout-session-response-dto';
import { PageDto } from '../models/page-dto';

@Injectable({ providedIn: 'root' })
export class WorkoutSessionService {
  private apiUrl = `${environment.apiUrl}/session`;

  private readonly _http: HttpClient = inject(HttpClient);

  create(request: WorkoutSessionRequestDto): Observable<void> {
    return this._http.post<void>(this.apiUrl, request);
  }

  find(): Observable<PageDto<WorkoutSessionResponseDto>> {
    return this._http.get<PageDto<WorkoutSessionResponseDto>>(this.apiUrl);
  }

  findById(id: number): Observable<WorkoutSessionResponseDto> {
    return this._http.get<WorkoutSessionResponseDto>(`${this.apiUrl}/${id}`);
  }

  update(id: number, request: WorkoutSessionRequestDto): Observable<void> {
    return this._http.put<void>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
