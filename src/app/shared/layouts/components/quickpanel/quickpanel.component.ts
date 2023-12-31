import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '@shared/material/material.module';

@Component({
  selector: 'vex-quickpanel',
  templateUrl: './quickpanel.component.html',
  styleUrls: ['./quickpanel.component.scss'],
  standalone: true,
  imports: [
    MaterialModule,
    RouterLink
  ]
})
export class QuickpanelComponent implements OnInit {
  date = DateTime.local().toFormat('DD');
  dayName = DateTime.local().toFormat('EEEE');

  constructor() {}

  ngOnInit() {}
}
