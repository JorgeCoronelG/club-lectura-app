import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '@core/material/material.module';

@Component({
  selector: 'vex-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [MaterialModule]
})
export class FooterComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {}

  ngOnDestroy(): void {}
}
