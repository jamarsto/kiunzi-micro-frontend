import { Route, UrlMatcher, UrlSegment } from '@angular/router';
import { WebComponentWrapper, WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';
import { Module } from '../../types/module/module.type';

export function microFrontEndRoute(module: Module) : Route {
  // provided a role without a guard. Hence don't try to guard
  if(
      typeof module.guards === 'undefined'
      || module.guards === null
      || module.guards.length === 0
      || (module.guards.length > 0 && typeof module.guards[0] === 'string')) {
    return {
      matcher: shellPath(module.prefix),
      component: WebComponentWrapper,
      data: {
        type: 'module',
        remoteEntry: '/mfe/' + module.name + '/remoteEntry.js',
        exposedModule: './RemoteAppModule',
        elementName: 'mfe-' + module.name,
      } as WebComponentWrapperOptions
    }
  }
  // provided guard(s) without role(s).  Just do authorized check
  if(typeof module.roles === 'undefined'
      || module.roles === null
      || module.roles.length === 0) {
    return {
      matcher: shellPath(module.prefix),
      component: WebComponentWrapper,
      data: {
        type: 'module',
        remoteEntry: '/mfe/' + module.name + '/remoteEntry.js',
        exposedModule: './RemoteAppModule',
        elementName: 'mfe-' + module.name,
      } as WebComponentWrapperOptions, canLoad: module.guards, canActivate: module.guards, canActivateChild: module.guards
    }
  }
  // provided guard(s) and role(s). Do full check
  return {
    matcher: shellPath(module.prefix),
    component: WebComponentWrapper,
    data: {
      type: 'module',
      remoteEntry: '/mfe/' + module.name + '/remoteEntry.js',
      exposedModule: './RemoteAppModule',
      elementName: 'mfe-' + module.name,
      role: module.roles,
    } as WebComponentWrapperOptions, canLoad: module.guards, canActivate: module.guards, canActivateChild: module.guards
  }
}

function shellPath(shellPath: string): UrlMatcher {
  return (url: UrlSegment[]) => {
    if(url.length > 0 && url[0].path === shellPath) {
      return ({ consumed: url });
    }
    return null;
  }
}
