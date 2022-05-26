import { Component, OnInit } from '@angular/core';
import { ActiveModulePath, Modules } from '@jamarsto/kiunzi-micro-frontend-tools';
import { MenuItemsService } from '../../service/menu-items/menu-items.service';
import { customShellRoutes } from '../../app-routing.module';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  modules: Modules = customShellRoutes.moduleRoutes;

  constructor(private menuItemService: MenuItemsService, private activeModulePath: ActiveModulePath) {}

  ngOnInit(): void {
    this.modules.forEach((entry) => this
        .menuItemService
        .getMenuItemsForModule(entry.name)
        .subscribe((children) => entry.items = children));
  }

  collapse(): void {
    this.isCollapsed = true;
  }

  modulePathActiveClass(activeClass: string, path: string): string {
    if(this.activeModulePath.get() === path) {
      return activeClass;
    }
    return '';
  }

  toggle(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
