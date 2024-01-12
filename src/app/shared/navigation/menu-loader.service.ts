import { Injectable } from '@angular/core';
import { NavigationItem } from './navigation-item.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuLoaderService {
  private readonly _items: BehaviorSubject<NavigationItem[]> =
    new BehaviorSubject<NavigationItem[]>([]);

  private readonly _defaultDashboard: NavigationItem = {
    type: 'link',
    label: 'Dashboard',
    icon: 'mat:dashboard',
    route: '/dashboard'
  };

  get items$(): Observable<NavigationItem[]> {
    return this._items.asObservable();
  }

  constructor() {
    this.loadDefaultNavigation();
  }

  loadDefaultNavigation(): void {
    this._items.next([this._defaultDashboard]);
  }

  loadNavigation(items: NavigationItem[]): void {
    const menu: NavigationItem[] = [this._defaultDashboard].concat(items);
    this._items.next(menu);
  }
}
