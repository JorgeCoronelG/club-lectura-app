import { Injectable } from '@angular/core';
import {
  NavigationDropdown,
  NavigationItem,
  NavigationLink,
  NavigationSubheading
} from './navigation-item.interface';
import { Observable, Subject } from 'rxjs';
import { MenuLoaderService } from './menu-loader.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  items$: Observable<NavigationItem[]> = this.navigationLoaderService.items$;

  private _openChangeSubject = new Subject<NavigationDropdown>();
  openChange$ = this._openChangeSubject.asObservable();

  constructor(
    private readonly navigationLoaderService: MenuLoaderService
  ) {}

  triggerOpenChange(item: NavigationDropdown) {
    this._openChangeSubject.next(item);
  }

  isLink(item: NavigationItem): item is NavigationLink {
    return item.type === 'link';
  }

  isDropdown(item: NavigationItem): item is NavigationDropdown {
    return item.type === 'dropdown';
  }

  isSubheading(item: NavigationItem): item is NavigationSubheading {
    return item.type === 'subheading';
  }
}
