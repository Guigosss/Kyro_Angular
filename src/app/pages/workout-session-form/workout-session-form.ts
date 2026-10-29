import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from '../../services/exercise.service';
import { WorkoutSessionService } from '../../services/workout-session.service';
import { ExerciseDto } from '../../models/exercise-dto';
import { WorkoutSessionRequestDto } from '../../models/workout-session-request-dto';
import { ExerciseForm } from '../../components/exercise-form/exercise-form';
import { WorkoutSessionResponseDto } from '../../models/workout-session-response-dto';

@Component({
  imports: [ReactiveFormsModule, ExerciseForm],
  selector: 'app-workout-session-form',
  styleUrl: './workout-session-form.scss',
  templateUrl: './workout-session-form.html',
})

export class WorkoutSessionForm {
  private readonly _fb: FormBuilder = inject(FormBuilder);
  private readonly _router: Router = inject(Router);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _exerciseService: ExerciseService = inject(ExerciseService);
  private readonly _workoutSessionService: WorkoutSessionService = inject(WorkoutSessionService);

  form: FormGroup = this. _fb.group({
    name: ['', Validators.required],
    date: ['', Validators.required],
    notes: ['', Validators.maxLength(500)],
    exercises: this._fb.array([], [Validators.required]),
  });

  readonly sessionId: number | null;

  readonly availableExercises = signal<ExerciseDto[]>([]);
  readonly errorMessage = signal<string | null>(null);

  constructor() {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    this.sessionId = id ? id : null;

    this._exerciseService.find().subscribe((page) => {
      this.availableExercises.set(page.content);
    });

    if (this.sessionId === null) {
      this.addExercise();
    } else {
      this._workoutSessionService.findById(this.sessionId).subscribe({
        next: (session) => this.fill(session),
        error: () => this.errorMessage.set('Session not found'),
      })
    }

  }

  //- FormArray: a dynamic list to which you can add or remove items.
  get exercisesForm(): FormArray<FormGroup> {
    return this.form.get('exercises') as FormArray<FormGroup>;
  }

  setsForm(exerciseIndex: number): FormArray<FormGroup> {
    return this.exercisesForm.at(exerciseIndex).get('sets') as FormArray<FormGroup>;
  }

  //- FormGroup: an object that groups named fields;
  private createSet(weight: number = 0, reps: number = 1): FormGroup {
    return this._fb.group({
      weight: [weight, [Validators.required, Validators.min(0), Validators.max(500)]],
      reps: [reps, [Validators.required]],
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

    const request = this.form.value as WorkoutSessionRequestDto;

    const call =
      this.sessionId === null
        ? this._workoutSessionService.create(request)
        : this._workoutSessionService.update(this.sessionId, request);

    call.subscribe({
      next: () => {
        this.errorMessage.set(null);
        this._router.navigate(['/sessions']);
      },
      error: (error) => {
        console.error('Failed to save session', error);
        this.errorMessage.set('Unable to save the session.');
      },
    });
  }

  private createExercise(exerciseId: number | null = null): FormGroup {
    return this._fb.group({
      exerciseId: [exerciseId, [Validators.required]],
      sets: this._fb.array([this.createSet()], [Validators.required]),
    });
  }

  private fill(session: WorkoutSessionResponseDto): void {
    this.form.patchValue({
      name: session.nom,
      date: session.date,
      notes: session.notes,
    });

    this.exercisesForm.clear();

    for (const exercise of session.exercises) {
      const group = this.createExercise(exercise.exerciseId);
      const sets = group.get('sets') as FormArray<FormGroup>;
      sets.clear();

      const orderedSets = [...exercise.sets].sort((a, b) => a.orderIndex - b.orderIndex);
      for (const set of orderedSets) {
        sets.push(this.createSet(set.weight, set.reps));
      }

      this.exercisesForm.push(group);
    }
  }
}
