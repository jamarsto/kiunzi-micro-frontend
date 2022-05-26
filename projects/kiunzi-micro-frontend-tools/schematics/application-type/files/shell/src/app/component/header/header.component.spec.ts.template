import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActiveModulePath, MenuItems } from '@jamarsto/kiunzi-micro-frontend-tools';
import { of } from 'rxjs';
import { MenuItemsService } from '../../service/menu-items/menu-items.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    let activeModulePathSpy = jasmine.createSpyObj('ActiveModulePath', ['get'], {});
    let menuItemsServiceSpy = jasmine.createSpyObj('MenuItemsService', ['getMenuItemsForModule'], {});
    menuItemsServiceSpy.getMenuItemsForModule.and.returnValue(of([{ title: 'Retail', link: 'retail', fullMatch: false }] as MenuItems));
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [  NgbModule, HttpClientTestingModule, RouterTestingModule ],
      providers: [
        { provide: MenuItemsService, useValue: menuItemsServiceSpy },
        { provide: ActiveModulePath, userValue: activeModulePathSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should collapse', () => {
    component.collapse();
    expect(component.isCollapsed).toBeTrue();
  })
  it('should toggle', () => {
    let currentState: boolean = component.isCollapsed;
    component.toggle();
    expect(component.isCollapsed).toBe(!currentState);
  })

  it('should match start of active path ', () => {
    getActiveModulePath(component).get.and.ReturnValue('retail');
    expect(component.modulePathActiveClass('active','retail')).toBe('active');
  })

  it('should not match start of active path ', () => {
    getActiveModulePath(component).get.and.ReturnValue('');
    expect(component.modulePathActiveClass('active','retail')).toBe('');
  })

  it('should have 1 menu items', () => {
    expect(component.modules.length).toBeGreaterThan(0);
    expect(component.modules[0].items.length).toBe(1);
  })
});

function getActiveModulePath(component: any): any {
  return component.activeModulePath;
}
