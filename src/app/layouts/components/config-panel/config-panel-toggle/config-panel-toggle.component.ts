import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MaterialModule } from '@core/material/material.module';

@Component({
  selector: 'vex-config-panel-toggle',
  templateUrl: './config-panel-toggle.component.html',
  styleUrls: ['./config-panel-toggle.component.scss'],
  standalone: true,
  imports: [MaterialModule]
})
export class ConfigPanelToggleComponent implements OnInit {
  @Output() openConfig = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
