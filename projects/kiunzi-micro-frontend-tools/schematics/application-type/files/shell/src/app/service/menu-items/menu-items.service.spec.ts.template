import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MenuItemsService } from './menu-items.service';
import { MenuItem, MenuItems } from '@jamarsto/kiunzi-micro-frontend-tools';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('MenuItemsService', () => {
  let service: MenuItemsService;

  beforeEach(() => {
    let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get'], {})
    httpClientSpy.get.and.returnValue(of([ { title: 'Retail', link: '', fullMatch: false } as MenuItem] as MenuItems));
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [{ provide: HttpClient, useValue: httpClientSpy }]
    });
    service = TestBed.inject(MenuItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return ', () => {
    let actualMenuItems: MenuItems | undefined;
    (service.getMenuItemsForModule('anyvalue') as Observable<MenuItems>).subscribe((menuItems) => actualMenuItems = menuItems);
    expect(actualMenuItems).toHaveSize(1)
  })
});
