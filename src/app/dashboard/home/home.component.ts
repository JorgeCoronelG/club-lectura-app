import { Component } from '@angular/core';
import { StatisticCardComponent } from './components/statistic-card/statistic-card.component';
import { NgFor } from '@angular/common';

interface Card {
  icon: string;
  value: string;
  label: string;
  iconClass?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    StatisticCardComponent,
    NgFor
  ],
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {
  cards: Card[] = [
    {
      icon: 'mat:menu_book',
      value: '37',
      label: 'Total Libros'
    },
    {
      icon: 'mat:published_with_changes',
      value: '17',
      label: 'Total Préstamos'
    },
    {
      icon: 'mat:handshake',
      value: '8',
      label: 'Préstamos activos'
    },
    {
      icon: 'mat:event_busy',
      value: '3',
      label: 'Total Multas'
    }
  ];
}
