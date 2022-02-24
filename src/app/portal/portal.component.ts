import { Breakpoints, BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent {
  public isHandset$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router) {
    // TODO: revisar si no hay fuga de memoria
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map<BreakpointState, boolean>(result => result.matches),
        shareReplay()
      );
  }

  public navigateByUrl(url: string): void {
    this.router.navigateByUrl(url);
  }
}
