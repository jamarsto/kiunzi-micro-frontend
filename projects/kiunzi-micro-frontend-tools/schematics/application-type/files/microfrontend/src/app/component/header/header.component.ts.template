import { Component, OnInit } from '@angular/core';
import { ActiveModulePath, Module } from '@jamarsto/kiunzi-micro-frontend-tools';
import { shellModule } from '../../remote-app/remote-app-routing.module';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  module: Module = shellModule;

  constructor(private activeModulePath: ActiveModulePath) {}

  ngOnInit(): void {}

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
