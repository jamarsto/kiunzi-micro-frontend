import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SyncRouteModule } from '@jamarsto/kiunzi-micro-frontend-tools';
import { shellModule } from './remote-app-routing.module';

@Component({
  templateUrl: './remote-app.component.html',
  styleUrls: ['./remote-app.component.sass']
})
export class RemoteAppComponent implements OnInit {
  constructor(private router: Router, private syncRouteModule: SyncRouteModule) {}

  ngOnInit(): void {
    this.syncRouteModule.sync(this.router, shellModule.name);
  }
}
