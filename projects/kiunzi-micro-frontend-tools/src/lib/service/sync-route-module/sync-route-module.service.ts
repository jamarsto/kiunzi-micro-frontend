import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ActiveModulePath } from '../active-module-path/active-module-path.service';

@Injectable({
  providedIn: 'root'
})
export class SyncRouteModule {
  constructor(private activeModulePath: ActiveModulePath) {}

  sync(router: Router, module: string): void {
    router
        .events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe(() => this.dispatchEvent(module));
    window.addEventListener('popstate', () => this.navigate(router));
    window.addEventListener('shellNavigationEvent', (event) => this.updateRoute(router, event as CustomEvent, module));
    this.navigate(router);
  }

  private details(module: string): CustomEventInit {
    return { detail: module };
  }

  private dispatchEvent(module: string): void {
    window.dispatchEvent(new CustomEvent('mfeNavigationEvent', this.details(module)));
  }

  private navigate(router: Router): void {
    router.navigateByUrl(window.location.pathname);
  }

  private updateRoute(router: Router, event: CustomEvent, module: string): void {
    if(event.detail === module) {
      this.navigate(router);
    }
  }
}

