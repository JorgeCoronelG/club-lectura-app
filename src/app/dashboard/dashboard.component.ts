import { Component } from '@angular/core';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { BaseLayoutComponent } from '@shared/layouts/base-layout/base-layout.component';
import { ConfigPanelComponent } from '@shared/layouts/components/config-panel/config-panel.component';
import {
  ConfigPanelToggleComponent
} from '@shared/layouts/components/config-panel/config-panel-toggle/config-panel-toggle.component';
import { FooterComponent } from '@shared/layouts/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '@shared/layouts/components/sidenav/sidenav.component';
import { ToolbarComponent } from '@shared/layouts/components/toolbar/toolbar.component';
import { VexProgressBarComponent } from '@shared/components/vex-progress-bar/vex-progress-bar.component';
import { VexSidebarComponent } from '@shared/components/vex-sidebar/vex-sidebar.component';
import { MaterialModule } from '@shared/material/material.module';
import { combineLatest, Observable } from 'rxjs';
import { VexConfig } from '@shared/config/vex-config.interface';
import { map } from 'rxjs/operators';
import { MatDrawerMode } from '@angular/material/sidenav';
import { VexLayoutService } from '@shared/services/vex-layout.service';
import { VexConfigService } from '@shared/config/vex-config.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MaterialModule,
    BaseLayoutComponent,
    NgIf,
    AsyncPipe,
    SidenavComponent,
    ToolbarComponent,
    FooterComponent,
    ConfigPanelToggleComponent,
    VexSidebarComponent,
    ConfigPanelComponent,
    NgTemplateOutlet,
    RouterOutlet,
    VexProgressBarComponent
  ],
  templateUrl: './dashboard.component.html',
  styles: ['']
})
export class DashboardComponent {
  config$: Observable<VexConfig> = this.configService.config$;
  sidenavCollapsed$: Observable<boolean> = this.layoutService.sidenavCollapsed$;
  sidenavDisableClose$: Observable<boolean> = this.layoutService.isDesktop$;
  sidenavFixedInViewport$: Observable<boolean> =
    this.layoutService.isDesktop$.pipe(map((isDesktop) => !isDesktop));
  sidenavMode$: Observable<MatDrawerMode> = combineLatest([
    this.layoutService.isDesktop$,
    this.configService.select((config) => config.layout)
  ]).pipe(
    map(([isDesktop, layout]) =>
      !isDesktop || layout === 'vertical' ? 'over' : 'side'
    )
  );
  sidenavOpen$: Observable<boolean> = this.layoutService.sidenavOpen$;
  configPanelOpen$: Observable<boolean> = this.layoutService.configPanelOpen$;

  constructor(
    private readonly layoutService: VexLayoutService,
    private readonly configService: VexConfigService
  ) {}

  onSidenavClosed(): void {
    this.layoutService.closeSidenav();
  }
}
