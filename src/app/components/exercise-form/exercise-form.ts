import { Component, input, output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExerciseDto } from '../../models/exercise-dto';
import { SetRow } from '../set-row/set-row';

@Component({
  selector: 'app-exercise-form',
  imports: [ReactiveFormsModule, SetRow],
  templateUrl: './exercise-form.html',
  styleUrl: './exercise-form.scss',
})

export class ExerciseForm {
  readonly group = input.required<FormGroup>();
  readonly index = input.required<number>();
  readonly availableExercises = input.required<ExerciseDto[]>();

  readonly remove = output<void>();
  readonly addSet = output<void>();
  readonly removeSet = output<number>();

  get sets(): FormArray<FormGroup> {
    return this.group().get('sets') as FormArray<FormGroup>;
  }
}
