import { Component, input } from '@angular/core';
import { ExerciseWorkoutResponseDto } from '../../models/exercise-workout-response-dto';

@Component({
  imports: [],
  selector: 'app-exercise-workout-card',
  styleUrl: './exercise-workout-card.scss',
  templateUrl: './exercise-workout-card.html',
})

export class ExerciseWorkoutCard {
  readonly exercise = input.required<ExerciseWorkoutResponseDto>();
}
