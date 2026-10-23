import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WorkoutSessionResponseDto } from '../../models/workout-session-response-dto';
import { RouterLink } from '@angular/router';

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-session-card',
  styleUrl: './session-card.scss',
  templateUrl: './session-card.html',
})

export class SessionCard {
  readonly session = input.required<WorkoutSessionResponseDto>();

  readonly remove = output<void>();
}
