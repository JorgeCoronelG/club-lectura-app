import { Breakpoints, BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent {
  public isHandset$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    // TODO: revisar si no hay fuga de memoria
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map<BreakpointState, boolean>(result => result.matches),
        shareReplay()
      );
  }

}
