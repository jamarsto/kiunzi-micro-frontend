import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CustomShellRoutes } from '../../types/custom-shell-routes/custom-shell-routes.type';
import { ActiveModulePath } from '../active-module-path/active-module-path.service';

@Injectable({
  providedIn: 'root'
})
export class SyncRouteShell {
  constructor(private activeModulePath: ActiveModulePath) {}

  sync(router: Router, customRoutes: CustomShellRoutes): void {
    const moduleByPath: Map<string,string> = this.getModuleByPath(customRoutes);
    const pathByModule: Map<string,string> = this.getPathByModule(customRoutes);
    router
        .events
        .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
        .subscribe(() => this.dispatchEvent(moduleByPath));
    window.addEventListener('popstate', () => this.navigate(router));
    window.addEventListener('mfeNavigationEvent', (event) => this.updateRoute(router, event as CustomEvent, pathByModule));
    this.navigate(router);
  }

  private details(moduleByPath: Map<string,string>): CustomEventInit {
    return { detail: moduleByPath.get(this.activeModulePath.get()) };
  }

  private dispatchEvent(moduleByPath: Map<string,string>): void {
    window.dispatchEvent(new CustomEvent('shellNavigationEvent', this.details(moduleByPath)));
  }

  private getModuleByPath(customRoutes: CustomShellRoutes): Map<string,string> {
    const moduleByPath: Map<string,string> = new Map<string,string>();
    customRoutes.moduleRoutes.forEach((item) => moduleByPath.set(item.prefix, item.name));
    return moduleByPath;
  }

  private getPathByModule(customRoutes: CustomShellRoutes): Map<string,string> {
    const pathByModule: Map<string,string> = new Map<string,string>();
    customRoutes.moduleRoutes.forEach((item) => pathByModule.set(item.name, item.prefix));
    return pathByModule;
  }

  private navigate(router: Router): void {
    router.navigateByUrl(window.location.pathname);
  }

  private updateRoute(router: Router, event: CustomEvent, pathByModule: Map<string,string>): void {
    if(this.activeModulePath.get() === pathByModule.get(event.detail)) {
      this.navigate(router);
    }
  }
}

