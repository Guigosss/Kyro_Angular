import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-set-row',
  imports: [ReactiveFormsModule],
  templateUrl: './set-row.html',
  styleUrl: './set-row.scss',
})
export class SetRow {
  readonly group = input.required<FormGroup>();
  readonly index = input.required<number>();
  readonly remove = output<void>();
}
