import { Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';

@Component({
  selector: 'app-statistic-card',
  standalone: true,
  imports: [
    MaterialModule,
    NgClass,
    NgIf,
  ],
  templateUrl: './statistic-card.component.html',
  styles: []
})
export class StatisticCardComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) value!: string;
  @Input({ required: true }) label!: string;
  @Input() iconClass = 'text-primary-600 bg-primary-600/10';

  constructor() {}
}
