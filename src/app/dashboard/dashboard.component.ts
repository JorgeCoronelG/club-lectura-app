import { BreakpointObserver, Breakpoints, BreakpointState } from "@angular/cdk/layout";
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Role } from "../core/enums/role";
import { UserSession } from "../core/models/user-session";
import { UserSessionService } from "../core/services/user-session.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public isHandset$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver,
              private userSessionService: UserSessionService,
              private router: Router) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map<BreakpointState, boolean>(result => result.matches),
        shareReplay()
      );
  }

  get user(): UserSession {
    return this.userSessionService.user;
  }

  get role() {
    return Role;
  }

  ngOnInit(): void {}

  public isAuthorize(roles: any[]): boolean {
    let authorize = false;
    this.userSessionService.user.roles?.forEach(rol => {
      if (roles.includes(rol.id)) {
        authorize = true;
      }
    });
    return authorize;
  }

  public logout(): void {
    this.userSessionService.logout().subscribe(() => {
      this.userSessionService.removeToken();
      this.userSessionService.clearUser();
      this.router.navigateByUrl('/auth/login');
    });
  }
}
