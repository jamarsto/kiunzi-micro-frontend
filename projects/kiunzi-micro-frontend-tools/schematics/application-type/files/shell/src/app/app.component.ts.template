import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SyncRouteShell } from '@jamarsto/kiunzi-micro-frontend-tools';
import { customShellRoutes } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private router: Router, private syncRouteShell: SyncRouteShell) {
    this.syncRouteShell.sync(this.router, customShellRoutes);
  }
}
