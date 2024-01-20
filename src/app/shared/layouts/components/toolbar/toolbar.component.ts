import { Component, DestroyRef, HostBinding, inject, OnInit } from '@angular/core';
import { VexLayoutService } from '@shared/services/vex-layout.service';
import { VexConfigService } from '@shared/config/vex-config.service';
import { filter, map, startWith } from 'rxjs/operators';
import { MenuService } from '@shared/navigation/menu.service';
import { Observable } from 'rxjs';
import { NavigationComponent } from '../navigation/navigation.component';
import { ToolbarUserComponent } from './toolbar-user/toolbar-user.component';
import { NavigationItemComponent } from '../navigation/navigation-item/navigation-item.component';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { NavigationItem } from '@shared/navigation/navigation-item.interface';
import { checkRouterChildsData } from '@shared/utils/check-router-childs-data';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialModule } from '@shared/material/material.module';

@Component({
  selector: 'vex-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [
    MaterialModule,
    NgIf,
    RouterLink,
    NgClass,
    NgFor,
    NavigationItemComponent,
    ToolbarUserComponent,
    NavigationComponent,
    AsyncPipe
  ]
})
export class ToolbarComponent implements OnInit {
  @HostBinding('class.shadow-b')
  showShadow: boolean = false;

  navigationItems$: Observable<NavigationItem[]> =
    this.navigationService.items$;

  isHorizontalLayout$: Observable<boolean> = this.configService.config$.pipe(
    map((config) => config.layout === 'horizontal')
  );
  isVerticalLayout$: Observable<boolean> = this.configService.config$.pipe(
    map((config) => config.layout === 'vertical')
  );
  isNavbarInToolbar$: Observable<boolean> = this.configService.config$.pipe(
    map((config) => config.navbar.position === 'in-toolbar')
  );
  isNavbarBelowToolbar$: Observable<boolean> = this.configService.config$.pipe(
    map((config) => config.navbar.position === 'below-toolbar')
  );

  isDesktop$: Observable<boolean> = this.layoutService.isDesktop$;
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private readonly layoutService: VexLayoutService,
    private readonly configService: VexConfigService,
    private readonly navigationService: MenuService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.showShadow = checkRouterChildsData(
          this.router.routerState.root.snapshot,
          (data) => data.toolbarShadowEnabled ?? false
        );
      });
  }

  openSidenav(): void {
    this.layoutService.openSidenav();
  }
}
