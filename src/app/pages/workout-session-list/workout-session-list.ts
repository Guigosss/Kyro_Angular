import { Component, inject, signal } from '@angular/core';
import { WorkoutSessionService } from '../../services/workout-session.service';
import { WorkoutSessionResponseDto } from '../../models/workout-session-response-dto';
import { RouterLink } from '@angular/router';
import { SessionCard } from '../../components/session-card/session-card';
import { DeleteConfirmation } from '../../components/delete-confirmation/delete-confirmation';

@Component({
  imports: [SessionCard, RouterLink, DeleteConfirmation],
  selector: 'app-workout-session-list',
  styleUrl: './workout-session-list.scss',
  templateUrl: './workout-session-list.html',
})

export class WorkoutSessionList {
  private readonly _workoutSessionService: WorkoutSessionService = inject(WorkoutSessionService);

  readonly sessions = signal<WorkoutSessionResponseDto[]>([]);
  readonly sessionToDelete = signal<WorkoutSessionResponseDto | null>(null);

  constructor() {
    this.load();
  }

  load(): void {
    this._workoutSessionService.find().subscribe((page) => {
      this.sessions.set(page.content);
    })
  }

  askDelete(session: WorkoutSessionResponseDto): void {
    this.sessionToDelete.set(session);
  }

  closeConfirmation(): void {
    this.sessionToDelete.set(null);
  }

  confirmDelete(): void {
    const session = this.sessionToDelete();
    if (!session) {
      return;
    }
    this.remove(session);
  }

  remove(session: WorkoutSessionResponseDto): void {
    this._workoutSessionService.delete(session.id).subscribe({
      next: () => {
        this.closeConfirmation();
        this.load()
      },
      error: (error) => {
        console.error('Failed to delete workout session', error);
        this.closeConfirmation();
      },
    });
  }
}
