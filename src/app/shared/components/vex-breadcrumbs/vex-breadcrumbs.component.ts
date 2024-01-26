import { Component, Input } from '@angular/core';
import { VexBreadcrumbComponent } from './vex-breadcrumb/vex-breadcrumb.component';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { Breadcrumb } from '@shared/components/vex-breadcrumbs/interfaces/breadcrumb.interface';

@Component({
  selector: 'vex-breadcrumbs',
  template: `
    <div class="flex items-center gap-2">
      <vex-breadcrumb>
        <a [routerLink]="['/dashboard']">
          <mat-icon svgIcon="mat:home" class="icon-sm"></mat-icon>
        </a>
      </vex-breadcrumb>
      <ng-container *ngFor="let crumb of crumbs; trackBy: trackByIndex">
        <div class="w-1 h-1 bg-gray-600 rounded-full"></div>
        <vex-breadcrumb>
          <a [routerLink]="route(crumb.route)">{{ crumb.label }}</a>
        </vex-breadcrumb>
      </ng-container>
    </div>
  `,
  standalone: true,
  imports: [
    VexBreadcrumbComponent,
    RouterLink,
    NgFor,
    MaterialModule
  ]
})
export class VexBreadcrumbsComponent {
  @Input() crumbs: Breadcrumb[] = [];

  route(routes: string[]): string[] {
    return ['/', ... routes];
  }

  trackByIndex(index: number): number {
    return index;
  }
}
