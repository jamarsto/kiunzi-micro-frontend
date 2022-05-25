import { Route, UrlMatcher, UrlSegment } from '@angular/router';
import { RootComponent } from '../../component/root/root.component';
import { ModuleRoute } from '../../types/module-route/module-route.type';

export function moduleRoute(moduleRoute: ModuleRoute) : Route {
  const moduleRouteComponent: any =
      typeof moduleRoute.component === 'undefined'
          ? RootComponent
          : moduleRoute.component;
  // provided a role without a guard. Hence don't try to guard
  if(
      typeof moduleRoute.guards === 'undefined'
      || moduleRoute.guards === null
      || moduleRoute.guards.length === 0) {
    return { matcher: modulePath(),
      component: moduleRouteComponent,
      children: moduleRoute.children
    };
  }
  // provided guard(s) without role(s).  Just do authorized check
  if(typeof moduleRoute.roles === 'undefined'
      || moduleRoute.roles === null
      || moduleRoute.roles.length === 0) {
    return { matcher: modulePath(),
      component: moduleRouteComponent,
      canLoad: moduleRoute.guards,
      canActivate: moduleRoute.guards,
      canActivateChild: moduleRoute.guards,
      children: moduleRoute.children
    };
  }
  // provided guard(s) and role(s). Do full check
  return { matcher: modulePath(),
    component: moduleRouteComponent,
    canLoad: moduleRoute.guards,
    canActivate: moduleRoute.guards,
    canActivateChild: moduleRoute.guards,
    data: { role: moduleRoute.roles },
    children: moduleRoute.children
  };
}

function modulePath(): UrlMatcher {
  return (url: UrlSegment[]) => {
    if(url.length > 0) {
      return ({ consumed: [url[0]] });
    }
    return null;
  }
}
