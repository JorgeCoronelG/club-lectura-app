import { Component, OnInit } from '@angular/core';
import { VexPopoverRef } from '@shared/components/vex-popover/vex-popover-ref';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '@core/material/material.module';

@Component({
  selector: 'vex-sidenav-user-menu',
  templateUrl: './sidenav-user-menu.component.html',
  styleUrls: ['./sidenav-user-menu.component.scss'],
  imports: [MaterialModule, RouterLink],
  standalone: true
})
export class SidenavUserMenuComponent implements OnInit {
  constructor(private readonly popoverRef: VexPopoverRef) {}

  ngOnInit(): void {}

  close(): void {
    /** Wait for animation to complete and then close */
    setTimeout(() => this.popoverRef.close(), 250);
  }
}
