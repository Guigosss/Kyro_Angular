import { WorkoutSetResponseDto } from './workout-set-response-dto';

export interface ExerciseWorkoutResponseDto {
  exerciseId: number;
  exerciseName: string;
  sets: WorkoutSetResponseDto[];
}
