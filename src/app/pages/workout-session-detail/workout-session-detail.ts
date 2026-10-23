import { Component, inject, signal } from '@angular/core';
import { WorkoutSessionService } from '../../services/workout-session.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WorkoutSessionResponseDto } from '../../models/workout-session-response-dto';
import { DatePipe } from '@angular/common';
import { ExerciseWorkoutCard } from '../../components/exercise-workout-card/exercise-workout-card';

@Component({
  imports: [RouterLink, DatePipe, ExerciseWorkoutCard],
  selector: 'app-workout-session-detail',
  styleUrl: './workout-session-detail.scss',
  templateUrl: './workout-session-detail.html',
})

export class WorkoutSessionDetail {
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _workoutSessionService: WorkoutSessionService = inject(WorkoutSessionService);

  readonly session = signal<WorkoutSessionResponseDto | null>(null);
  readonly errorMessage = signal<string | null>(null);

  constructor() {
    this.load();
  }

  load(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'));

    this._workoutSessionService.findById(id).subscribe({
      next: (workoutSession) => this.session.set(workoutSession),
      error: () => this.errorMessage.set('Session not found'),
    });
  }
}
