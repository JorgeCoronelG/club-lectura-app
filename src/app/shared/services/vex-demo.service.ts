import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { VexConfigService } from '@shared/config/vex-config.service';
import { filter } from 'rxjs/operators';

import { VexColorScheme, VexTheme } from '@shared/config/vex-config.interface';

@Injectable({
  providedIn: 'root'
})
export class VexDemoService {
  constructor(
    private readonly router: Router,
    private readonly configService: VexConfigService
  ) {
    /**
     * Config Related Subscriptions
     * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
     * Example: example.com/?layout=apollo&style=default
     */
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe(() => {
        const route = this.router.routerState.root.snapshot;

        if (route.queryParamMap.has('style')) {
          this.configService.updateConfig({
            style: {
              colorScheme: route.queryParamMap.get('style') as VexColorScheme
            }
          });
        }

        // TODO: Adjust primaryColor queryParam and see where it was used?
        const theme: VexTheme | null = route.queryParamMap.get(
          'theme'
        ) as VexTheme | null;
        if (theme) {
          this.configService.updateConfig({
            style: {
              themeClassName: theme
            }
          });
        }
      });
  }
}
