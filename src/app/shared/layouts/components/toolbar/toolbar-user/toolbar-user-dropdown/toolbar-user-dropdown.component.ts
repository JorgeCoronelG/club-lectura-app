import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VexPopoverRef } from '@shared/components/vex-popover/vex-popover-ref';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { UserSessionService } from '@shared/services/user-session.service';
import { AuthService } from '@shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import {
  ChangePasswordComponent
} from '@shared/layouts/components/toolbar/toolbar-user/toolbar-user-dropdown/components/change-password/change-password.component';
import {
  UserProfileComponent
} from '@shared/layouts/components/toolbar/toolbar-user/toolbar-user-dropdown/components/user-profile/user-profile.component';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'vex-toolbar-user-dropdown',
  templateUrl: './toolbar-user-dropdown.component.html',
  styleUrls: ['./toolbar-user-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MaterialModule,
    NgFor,
    RouterLink,
    NgClass,
    NgIf
  ]
})
export class ToolbarUserDropdownComponent {

  constructor(
    private popoverRef: VexPopoverRef<ToolbarUserDropdownComponent>,
    private router: Router,
    private matDialog: MatDialog,
    private userSessionService: UserSessionService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  get username(): string {
    return this.userSessionService.user.nombreCompleto;
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.popoverRef.close();
      this.router.navigateByUrl('/login');
    });
  }

  openDialogChangePassword(): void {
    this.popoverRef.close();

    this.matDialog.open(ChangePasswordComponent);
  }

  showProfile(): void {
    this.userService.showProfile().subscribe(user => {
      this.popoverRef.close();

      this.matDialog.open(UserProfileComponent, { data: user, panelClass: ['w-3/4', 'md:w-1/2'] });
    });
  }
}
