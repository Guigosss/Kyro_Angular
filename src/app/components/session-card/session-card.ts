import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WorkoutSessionResponseDto } from '../../models/workout-session-response-dto';

@Component({
  imports: [DatePipe],
  selector: 'app-session-card',
  styleUrl: './session-card.scss',
  templateUrl: './session-card.html',
})
export class SessionCard {
  readonly session = input.required<WorkoutSessionResponseDto>();
}
