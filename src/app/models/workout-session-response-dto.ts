import { ExerciseWorkoutResponseDto } from './exercise-workout-response-dto';

export interface WorkoutSessionResponseDto {
  id: number;
  nom: string;
  date: string;
  notes: string | null;
  userId: number;
  exercises: ExerciseWorkoutResponseDto[];
}
