import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonMenuItems, MenuItems } from '@jamarsto/kiunzi-micro-frontend-tools';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {
  constructor(private httpClient: HttpClient) {}

  getMenuItemsForModule(module: string): Observable<MenuItems> {
    return this
        .getJsonMenuItems(module)
        .pipe(map((result) => result.menuItems));
  }

  private getJsonMenuItems(module: string): Observable<JsonMenuItems> {
    return this.httpClient.get('/mfe/' + module + '/assets/menu.json') as Observable<JsonMenuItems>;
  }
}
