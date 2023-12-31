import { Component, Input, OnInit } from '@angular/core';
import { NavigationItem, NavigationLink } from '@shared/navigation/navigation-item.interface';
import { filter, map, startWith } from 'rxjs/operators';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NavigationService } from '@shared/navigation/navigation.service';
import { trackByRoute } from '@shared/utils/track-by';
import { AsyncPipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';

@Component({
  selector: 'vex-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
  standalone: true,
  imports: [
    MaterialModule,
    NgIf,
    NgClass,
    RouterLink,
    NgFor,
    NgTemplateOutlet,
    AsyncPipe
  ]
})
export class NavigationItemComponent implements OnInit {
  @Input({ required: true }) item!: NavigationItem;

  isActive$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(null),
    map(() => (item: NavigationItem) => this.hasActiveChilds(item))
  );

  isLink = this.navigationService.isLink;
  isDropdown = this.navigationService.isDropdown;
  isSubheading = this.navigationService.isSubheading;
  trackByRoute = trackByRoute;

  constructor(
    private navigationService: NavigationService,
    private router: Router
  ) {}

  ngOnInit() {}

  hasActiveChilds(parent: NavigationItem): boolean {
    if (this.isLink(parent)) {
      return this.router.isActive(parent.route as string, true);
    }

    if (this.isDropdown(parent) || this.isSubheading(parent)) {
      return parent.children.some((child) => {
        if (this.isDropdown(child)) {
          return this.hasActiveChilds(child);
        }

        if (this.isLink(child) && !this.isFunction(child.route)) {
          return this.router.isActive(child.route as string, true);
        }

        return false;
      });
    }

    return false;
  }

  isFunction(prop: NavigationLink['route']) {
    return prop instanceof Function;
  }
}
