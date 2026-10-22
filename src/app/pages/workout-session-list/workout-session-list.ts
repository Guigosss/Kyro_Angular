import { Component, inject, signal } from '@angular/core';
import { WorkoutSessionService } from '../../services/workout-session.service';
import { WorkoutSessionResponseDto } from '../../models/workout-session-response-dto';
import { RouterLink } from '@angular/router';
import { SessionCard } from '../../components/session-card/session-card';

@Component({
  imports: [SessionCard, RouterLink],
  selector: 'app-workout-session-list',
  styleUrl: './workout-session-list.scss',
  templateUrl: './workout-session-list.html',
})
export class WorkoutSessionList {
  private readonly _workoutSessionService: WorkoutSessionService = inject(WorkoutSessionService);

  readonly sessions = signal<WorkoutSessionResponseDto[]>([]);

  constructor() {
    this._workoutSessionService.find().subscribe((page) => {
      this.sessions.set(page.content);
    })
  }
}
