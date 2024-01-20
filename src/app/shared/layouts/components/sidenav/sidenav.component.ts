import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '@shared/navigation/menu.service';
import { VexLayoutService } from '@shared/services/vex-layout.service';
import { VexConfigService } from '@shared/config/vex-config.service';
import { map } from 'rxjs/operators';
import { NavigationItem } from '@shared/navigation/navigation-item.interface';
import { Observable } from 'rxjs';
import { VexScrollbarComponent } from '@shared/components/vex-scrollbar/vex-scrollbar.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { SidenavItemComponent } from './sidenav-item/sidenav-item.component';

@Component({
  selector: 'vex-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  standalone: true,
  imports: [
    MaterialModule,
    NgIf,
    VexScrollbarComponent,
    NgFor,
    AsyncPipe,
    SidenavItemComponent
  ]
})
export class SidenavComponent implements OnInit {
  @Input() collapsed: boolean = false;
  collapsedOpen$ = this.layoutService.sidenavCollapsedOpen$;
  imageUrl$ = this.configService.config$.pipe(
    map((config) => config.sidenav.imageUrl)
  );
  showCollapsePin$ = this.configService.config$.pipe(
    map((config) => config.sidenav.showCollapsePin)
  );

  items$: Observable<NavigationItem[]> = this.navigationService.items$;

  constructor(
    private navigationService: MenuService,
    private layoutService: VexLayoutService,
    private configService: VexConfigService
  ) {}

  ngOnInit() {}

  collapseOpenSidenav() {
    this.layoutService.collapseOpenSidenav();
  }

  collapseCloseSidenav() {
    this.layoutService.collapseCloseSidenav();
  }

  toggleCollapse() {
    this.collapsed
      ? this.layoutService.expandSidenav()
      : this.layoutService.collapseSidenav();
  }

  trackByRoute(index: number, item: NavigationItem): string {
    if (item.type === 'link') {
      return item.route;
    }

    return item.label;
  }
}
