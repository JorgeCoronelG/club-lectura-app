import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavigationDropdown, NavigationLink } from '@shared/navigation/navigation-item.interface';
import { Menu } from '@shared/models/menu.model';
import { SyncNavigation } from '../../dashboard/users/interfaces/sync-navigation.interface';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private _baseUrl = 'navigation/';

  private http: HttpClient = inject(HttpClient);

  get url(): string {
    return environment.baseUrl + this._baseUrl;
  }

  hasPermission(pathRoute: string): Observable<boolean> {
    const url = `${this.url}has-permission`;
    const params = new HttpParams()
      .append('pathRoute', pathRoute);

    return this.http.get<{hasPermission: boolean}>(url, { params }).pipe(
      map(({ hasPermission }) => hasPermission)
    );
  }

  getNavigationMenu(): Observable<Array<NavigationLink | NavigationDropdown>> {
    const url = `${this.url}navigation`;
    return this.http.get<Menu[]>(url).pipe(
      map<Menu[], Array<NavigationLink | NavigationDropdown>>(menus => {
        let navigationItems: Array<NavigationLink | NavigationDropdown> = [];

        menus.forEach(menu => {
          const haveChildren = menu.submenu.length > 0;
          let children: Array<NavigationLink> = [];

          if (haveChildren) {
            menu.submenu.forEach(({ pathRuta, etiqueta }) => {
              children.push({
                type: 'link',
                route: pathRuta,
                label: etiqueta
              });
            });
          }

          if (haveChildren) {
            navigationItems.push({
              type: 'dropdown',
              label: menu.etiqueta,
              icon: menu.icono,
              children
            });
          } else {
            navigationItems.push({
              type: 'link',
              route: menu.pathRuta,
              label: menu.etiqueta,
              icon: menu.icono
            });
          }
        });

        return navigationItems;
      })
    );
  }

  getNavigationByUserId(userId: number): Observable<Menu[]> {
    const url = `${this.url}user/${userId}`;
    return this.http.get<Menu[]>(url);
  }

  syncNavigation(userId: number, data: SyncNavigation): Observable<void> {
    const url = `${this.url}permission/${userId}`;
    return this.http.put<void>(url, data);
  }
}
