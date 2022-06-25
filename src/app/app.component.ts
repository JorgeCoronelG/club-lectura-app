import { Component } from '@angular/core';
import { Router, ActivationEnd } from "@angular/router";
import { Subscription, filter, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ParamsRoute } from "./core/models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public tituloSubs$: Subscription;

  constructor(private router: Router) {
    this.tituloSubs$ = this.getArgumentosRuta()
      .subscribe(({title}) => {
        document.title = title;
      });
  }

  public getArgumentosRuta(): Observable<ParamsRoute> {
    return this.router.events
      .pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter(event => event.snapshot.firstChild === null),
        map<any, ParamsRoute>(event => event.snapshot.data)
      );
  }
}
