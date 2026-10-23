import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ExerciseDto } from '../models/exercise-dto';
import { Observable } from 'rxjs';
import { PageDto } from '../models/page-dto';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  private apiUrl = `${environment.apiUrl}/exercise`;

  private readonly _http: HttpClient = inject(HttpClient);

  create(request: ExerciseDto): Observable<void> {
    return this._http.post<void>(this.apiUrl, request);
  }

  find(): Observable<PageDto<ExerciseDto>> {
    return this._http.get<PageDto<ExerciseDto>>(this.apiUrl);
  }

  update(id: number, request: ExerciseDto): Observable<void> {
    return this._http.put<void>(`${this.apiUrl}`, request);
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
