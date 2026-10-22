import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExerciseService } from '../../services/exercise.service';
import { WorkoutSessionService } from '../../services/workout-session.service';
import { ExerciseDto } from '../../models/exercise-dto';
import { WorkoutSessionRequestDto } from '../../models/workout-session-request-dto';
import { ExerciseForm } from '../../components/exercise-form/exercise-form';

@Component({
  imports: [ReactiveFormsModule, ExerciseForm],
  selector: 'app-workout-session-form',
  styleUrl: './workout-session-form.scss',
  templateUrl: './workout-session-form.html',
})
export class WorkoutSessionForm {
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);
  private readonly _exerciseService: ExerciseService = inject(ExerciseService);
  private readonly _workoutSessionService: WorkoutSessionService = inject(WorkoutSessionService);

  form: FormGroup = this. _fb.group({
    name: ['', Validators.required],
    date: ['', Validators.required],
    notes: ['', Validators.maxLength(500)],
    exercises: this._fb.array([], [Validators.required]),
  });

  readonly availableExercises = signal<ExerciseDto[]>([]);
  readonly errorMessage = signal<string | null>(null);

  constructor() {
    this._exerciseService.find().subscribe((page) => {
      this.availableExercises.set(page.content);
    });
    this.addExercise();
  }

  //- FormArray: a dynamic list to which you can add or remove items.
  get exercisesForm(): FormArray<FormGroup> {
    return this.form.get('exercises') as FormArray<FormGroup>;
  }

  setsForm(exerciseIndex: number): FormArray<FormGroup> {
    return this.exercisesForm.at(exerciseIndex).get('sets') as FormArray<FormGroup>;
  }

  //- FormGroup: an object that groups named fields;
  private createSet(): FormGroup {
    return this._fb.group({
      weight: [0, [Validators.required, Validators.min(0), Validators.max(500)]],
      reps: [1, [Validators.required]],
    });
  }

  addExercise(): void {
    this.exercisesForm.push(
      this._fb.group({
        exerciseId: [null as number | null, [Validators.required]],
        sets: this._fb.array([this.createSet()], [Validators.required]),
      }),
    );
  }

  removeExercise(index: number): void {
    this.exercisesForm.removeAt(index);
  }

  addSet(exerciseIndex: number): void {
    this.setsForm(exerciseIndex).push(this.createSet());
  }

  removeSet(exerciseIndex: number, setIndex: number): void {
    this.setsForm(exerciseIndex).removeAt(setIndex);
  }

  submit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this._workoutSessionService.create(this.form.value as WorkoutSessionRequestDto).subscribe({
      next: () => {
        this.errorMessage.set(null);
        this._router.navigate(['/sessions']);
      },
      error: (error) => {
        console.error('Failed creation', error);
        this.errorMessage.set('Unable to save the session.');
      },
    });
  }
}
