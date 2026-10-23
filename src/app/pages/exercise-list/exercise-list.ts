import { Component, inject, signal } from '@angular/core';
import { ExerciseService } from '../../services/exercise.service';
import { ExerciseDto } from '../../models/exercise-dto';
import { DeleteConfirmation } from '../../components/delete-confirmation/delete-confirmation';

@Component({
  imports: [DeleteConfirmation],
  selector: 'app-exercise-list',
  styleUrl: './exercise-list.scss',
  templateUrl: './exercise-list.html',
})

export class ExerciseList {
  private readonly _exerciseService: ExerciseService = inject(ExerciseService);

  readonly exercises = signal<ExerciseDto[]>([]);
  readonly exerciseToDelete = signal<ExerciseDto | null>(null);

  constructor() {
    this.load();
  }

  load(): void {
    this._exerciseService.find().subscribe((page) => {
      this.exercises.set(page.content);
    })
  }

  askDelete(exercise: ExerciseDto): void {
    this.exerciseToDelete.set(exercise);
  }

  closeConfirmation(): void {
    this.exerciseToDelete.set(null);
  }

  confirmDelete(): void {
    const exercise = this.exerciseToDelete();
    if (!exercise) {
      return;
    }
    this.remove(exercise);
  }

  remove(exercise: ExerciseDto): void {
    this._exerciseService.delete(exercise.id).subscribe({
      next: () => {
        this.closeConfirmation();
        this.load();
      },
      error: (error) => {
        console.error('Failed to delete exercise', error);
        this.closeConfirmation();
      }
    });
  }
}
