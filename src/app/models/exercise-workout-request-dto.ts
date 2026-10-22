import { WorkoutSetRequestDto } from './workout-set-request-dto';

export interface ExerciseWorkoutRequestDto {
  exerciseId: number;
  sets: WorkoutSetRequestDto[];
}
