import { Component } from '@angular/core';
import { StatisticCardComponent } from './components/statistic-card/statistic-card.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { CardInfo } from './interfaces/card-info';
import { DashboardService } from '@shared/services/dashboard.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    StatisticCardComponent,
    NgFor,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {
  cardInfo$: Observable<CardInfo[]>;

  constructor(
    private dashboardService: DashboardService,
  ) {
    this.cardInfo$ = this.dashboardService.getStadistics();
  }
}
