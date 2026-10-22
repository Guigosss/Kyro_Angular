import { ExerciseWorkoutRequestDto } from './exercise-workout-request-dto';

export interface WorkoutSessionRequestDto {
  name: string;
  date: string;
  notes?: string;
  exercises: ExerciseWorkoutRequestDto[];
}
