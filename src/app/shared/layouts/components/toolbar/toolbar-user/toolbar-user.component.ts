import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VexPopoverService } from '@shared/components/vex-popover/vex-popover.service';
import { ToolbarUserDropdownComponent } from './toolbar-user-dropdown/toolbar-user-dropdown.component';
import { MaterialModule } from '@shared/material/material.module';
import { UserSessionService } from '@shared/services/user-session.service';

@Component({
  selector: 'vex-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MaterialModule]
})
export class ToolbarUserComponent implements OnInit {
  dropdownOpen: boolean = false;

  constructor(
    private popover: VexPopoverService,
    private cd: ChangeDetectorRef,
    private userSessionService: UserSessionService
  ) {}

  get username(): string {
    return this.userSessionService.user.nombreCompleto;
  }

  ngOnInit() {}

  showPopover(originRef: HTMLElement) {
    this.dropdownOpen = true;
    this.cd.markForCheck();

    const popoverRef = this.popover.open({
      content: ToolbarUserDropdownComponent,
      origin: originRef,
      offsetY: 12,
      position: [
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top'
        }
      ]
    });

    popoverRef.afterClosed$.subscribe(() => {
      this.dropdownOpen = false;
      this.cd.markForCheck();
    });
  }
}
