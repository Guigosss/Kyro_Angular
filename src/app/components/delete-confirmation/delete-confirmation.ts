import { Component, contentChild, input, output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  imports: [
    NgTemplateOutlet
  ],
  selector: 'app-delete-confirmation',
  styleUrl: './delete-confirmation.scss',
  templateUrl: './delete-confirmation.html',
})

export class DeleteConfirmation {
  readonly itemName = input.required<string>();

  readonly cancelled = output<void>();
  readonly confirmed = output<void>();

  readonly customActions = contentChild<TemplateRef<unknown>>('customActions');
}
