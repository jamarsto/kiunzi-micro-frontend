import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { OidcSecurityService, AutoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginPartialRoutesWithRoleGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private router: Router,
    private autoLoginPartialRoutesGuard: AutoLoginPartialRoutesGuard,
  ) { }

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this
        .autoLoginPartialRoutesGuard
        .canActivate(next, state)
        .pipe(mergeMap(result => this.checkRoleForActivate(result, next)));
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this
        .autoLoginPartialRoutesGuard
        .canActivateChild(next, state)
        .pipe(mergeMap(result => this.checkRoleForActivateChild(result, next)));
  }

  canLoad(route: Route, url: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this
        .autoLoginPartialRoutesGuard
        .canLoad()
        .pipe(mergeMap(result => this.checkRoleForLoad(result, route, url)));
  }

  private checkRoleForActivate(isAuthenticated: boolean | UrlTree, next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    if(typeof isAuthenticated !== 'boolean' || isAuthenticated !== true) {
      return of(isAuthenticated);
    }
    return this
        .isInRole(next.data['role'])
        .pipe(map(isInRole => {
          if(isInRole === true) {
            return true;
          }
          return this.router.parseUrl('/unauthorized');
        }));
  }

  private checkRoleForActivateChild(isAuthenticated: boolean | UrlTree, next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    if(typeof isAuthenticated !== 'boolean' || isAuthenticated !== true) {
      return of(isAuthenticated);
    }
    const data = next.parent != null ? next.parent.data : next.data;
    return this
        .isInRole(data['role'])
        .pipe(map(isInRole => {
          if(isInRole === true) {
            return true;
          }
          return this.router.parseUrl('/unauthorized');
        }));
  }

  private checkRoleForLoad(isAuthenticated: boolean | UrlTree, next: Route, url: UrlSegment[]): Observable<boolean | UrlTree> {
    if(typeof isAuthenticated !== 'boolean' || isAuthenticated !== true || typeof next.data === 'undefined') {
      return of(isAuthenticated);
    }
    return this
        .isInRole(next.data['role'])
        .pipe(map(isInRole => {
          if(isInRole === true) {
            return true;
          }
          return this.router.parseUrl('/unauthorized');
        }));
  }

  private isInRole(role: string | string[]): Observable<boolean> {
    if(typeof role === 'object') {
      return this.isInRoleArray(role);
    }
    return this.isInRoleString(role);
  }

  private isInRoleArray(role: string[]): Observable<boolean> {
    if(role.length === 0) {
      return of(true);
    }
    return this
        .oidcSecurityService
        .userData$
        .pipe(map(({ userData }) => {
          const roles: string[] = userData.roles;
          if(typeof roles !== 'undefined' && roles != null) {
            var matchedAll: boolean = true;
            role.forEach((strRole) => {
              if(!(typeof strRole === 'undefined' || strRole === null || strRole.trim() === '' || roles.indexOf(strRole) >= 0)) {
                matchedAll = false;
              }
            });
            return matchedAll;
          }
          return false;
        }));
  }

  private isInRoleString(role: string): Observable<boolean> {
    if(typeof role === 'undefined' || role === null || role.trim() === '') {
      return of(true);
    }
    return this
        .oidcSecurityService
        .userData$
        .pipe(map(({ userData }) => {
          const roles = userData.roles;
          if(typeof roles !== 'undefined' && roles != null && roles.indexOf(role) >= 0) {
            return true;
          }
          return false;
        }));
  }
}
