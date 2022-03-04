import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserSession } from "../core/models/user-session";
import { UserSessionService } from "../core/services/user-session.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private userSessionService: UserSessionService,
              private router: Router) {}

  get user(): UserSession {
    return this.userSessionService.user;
  }

  ngOnInit(): void {}

  public logout(): void {
    this.userSessionService.logout().subscribe(() => {
      this.userSessionService.removeToken();
      this.router.navigateByUrl('/auth/login');
    });
  }
}
