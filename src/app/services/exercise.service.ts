import { inject, Injectable, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ExerciseDto } from '../models/exercise-dto';
import { Observable } from 'rxjs';
import { PageDto } from '../models/page-dto';

@Injectable({ providedIn: 'root' })
export class ExerciseService {
  private apiUrl = `${environment.apiUrl}/exercise`;

  private readonly _http: HttpClient = inject(HttpClient);

  find(): Observable<PageDto<ExerciseDto>> {
    return this._http.get<PageDto<ExerciseDto>>(this.apiUrl);
  }
}
