import { TestBed } from '@angular/core/testing';
import { Data, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AutoLoginAllRoutesGuard, OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';
import { Observable, of } from 'rxjs';

import { AutoLoginAllRoutesWithRoleGuard } from './all-routes-guard.service';

describe('AutoLoginAllRoutesWithRoleGuard', () => {
  let service: AutoLoginAllRoutesWithRoleGuard;

  beforeEach(() => {
    let oidcSecurityServiceSpy = jasmine.createSpyObj('OidcSecurityService', ['getIdToken','checkAuth','authorize'], {});
    let autoLoginAllRoutesGuardSpy = jasmine.createSpyObj('AutoLoginAllRoutesGuard', ['canActivate','canActivateChild','canLoad'], {});

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: OidcSecurityService,  useValue: oidcSecurityServiceSpy },
        { provide: AutoLoginAllRoutesGuard, useValue: autoLoginAllRoutesGuardSpy }
      ]
    });
    service = TestBed.inject(AutoLoginAllRoutesWithRoleGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('canActivate: Authenticated & Authorised - No Roles Property', () => {
    let activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['toString'], {});
    let routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canActivate.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    activatedRouteSnapshotSpy.data = {};
    let actualResponse: boolean | undefined
    (service.canActivate(activatedRouteSnapshotSpy, routerStateSnapshotSpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeTrue();
  })

  it('canActivate: Authenticated & Authorised - Empty Roles Array', () => {
    let activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['toString'], {});
    let routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canActivate.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    activatedRouteSnapshotSpy.data = { role: [] };
    let actualResponse: boolean | undefined
    (service.canActivate(activatedRouteSnapshotSpy, routerStateSnapshotSpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeTrue();
  })

  it('canActivate: Authenticated & Authorised - Empty Roles String', () => {
    let activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['toString'], {});
    let routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canActivate.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    activatedRouteSnapshotSpy.data = { role: '' };
    let actualResponse: boolean | undefined
    (service.canActivate(activatedRouteSnapshotSpy, routerStateSnapshotSpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeTrue();
  })

  it('canActivate: Authenticated & Authorised - Roles Match', () => {
    let activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['toString'], {});
    let routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canActivate.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    activatedRouteSnapshotSpy.data = { role: ['ADMIN','USER'] } as Data;
    let actualResponse: boolean | undefined
    (service.canActivate(activatedRouteSnapshotSpy, routerStateSnapshotSpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeTrue();
  })

  it('canActivate: Authenticated & Authorised - Roles Match', () => {
    let activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['toString'], {});
    let routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canActivate.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    activatedRouteSnapshotSpy.data = { role: 'USER' } as Data;
    let actualResponse: boolean | undefined
    (service.canActivate(activatedRouteSnapshotSpy, routerStateSnapshotSpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeTrue();
  })

  it('canActivate: Not Authenticated', () => {
    let activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['toString'], {});
    let routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canActivate.and.returnValue(of(false));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    activatedRouteSnapshotSpy.data = { role: ['ADMIN','USER'] } as Data;
    let actualResponse: boolean | undefined
    (service.canActivate(activatedRouteSnapshotSpy, routerStateSnapshotSpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeFalse();
  })

  it('canActivate: Not Authorised - Unmatched Role Array', () => {
    let activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['toString'], {});
    let routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canActivate.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    activatedRouteSnapshotSpy.data = { role: ['UNKNOWN'] } as Data;
    let actualResponse: UrlTree | undefined
    (service.canActivate(activatedRouteSnapshotSpy, routerStateSnapshotSpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeInstanceOf(UrlTree);
  })

  it('canActivate: Not Authorised - Unmatched Role Array - No User Roles', () => {
    let activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['toString'], {});
    let routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canActivate.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {} } as UserDataResult));

    activatedRouteSnapshotSpy.data = { role: ['UNKNOWN'] } as Data;
    let actualResponse: UrlTree | undefined
    (service.canActivate(activatedRouteSnapshotSpy, routerStateSnapshotSpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeInstanceOf(UrlTree);
  })

  it('canActivate: Not Authorised - Unmatched Role String', () => {
    let activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['toString'], {});
    let routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canActivate.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    activatedRouteSnapshotSpy.data = { role: 'UNKNOWN' } as Data;
    let actualResponse: UrlTree | undefined
    (service.canActivate(activatedRouteSnapshotSpy, routerStateSnapshotSpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeInstanceOf(UrlTree);
  })

  it('canActivate: Not Authorised - Unmatched Role String - No User Roles', () => {
    let activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['toString'], {});
    let routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canActivate.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {} } as UserDataResult));

    activatedRouteSnapshotSpy.data = { role: 'UNKNOWN' } as Data;
    let actualResponse: UrlTree | undefined
    (service.canActivate(activatedRouteSnapshotSpy, routerStateSnapshotSpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeInstanceOf(UrlTree);
  })

  it('canActivateChild: Authenticated & Authorised - No Roles Property', () => {
    let activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['toString'], {});
    let routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canActivateChild.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    activatedRouteSnapshotSpy.parent = {data: {}};
    let actualResponse: boolean | undefined
    (service.canActivateChild(activatedRouteSnapshotSpy, routerStateSnapshotSpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeTrue();
  })

  it('canActivateChild: Authenticated & Authorised - Empty Roles Array', () => {
    let activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['toString'], {});
    let routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canActivateChild.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    activatedRouteSnapshotSpy.data = { role: [] };
    let actualResponse: boolean | undefined
    (service.canActivateChild(activatedRouteSnapshotSpy, routerStateSnapshotSpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeTrue();
  })

  it('canActivateChild: Authenticated & Authorised - Empty Roles String', () => {
    let activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['toString'], {});
    let routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canActivateChild.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    activatedRouteSnapshotSpy.data = { role: '' };
    let actualResponse: boolean | undefined
    (service.canActivateChild(activatedRouteSnapshotSpy, routerStateSnapshotSpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeTrue();
  })

  it('canActivateChild: Authenticated & Authorised - Roles Match', () => {
    let activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['toString'], {});
    let routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canActivateChild.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    activatedRouteSnapshotSpy.data = { role: ['ADMIN','USER'] } as Data;
    let actualResponse: boolean | undefined
    (service.canActivateChild(activatedRouteSnapshotSpy, routerStateSnapshotSpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeTrue();
  })

  it('canActivateChild: Not Authenticated', () => {
    let activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['toString'], {});
    let routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canActivateChild.and.returnValue(of(false));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    activatedRouteSnapshotSpy.data = { role: ['ADMIN','USER'] } as Data;
    let actualResponse: boolean | undefined
    (service.canActivateChild(activatedRouteSnapshotSpy, routerStateSnapshotSpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeFalse();
  })

  it('canActivateChild: Not Authorised - Unmatched Role Array', () => {
    let activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['toString'], {});
    let routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canActivateChild.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    activatedRouteSnapshotSpy.data = { role: ['UNKNOWN'] } as Data;
    let actualResponse: UrlTree | undefined
    (service.canActivateChild(activatedRouteSnapshotSpy, routerStateSnapshotSpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeInstanceOf(UrlTree);
  })

  it('canActivateChild: Not Authorised - Unmatched Role String', () => {
    let activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['toString'], {});
    let routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canActivateChild.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    activatedRouteSnapshotSpy.data = { role: 'UNKNOWN' } as Data;
    let actualResponse: UrlTree | undefined
    (service.canActivateChild(activatedRouteSnapshotSpy, routerStateSnapshotSpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeInstanceOf(UrlTree);
  })

  it('canLoad: Authenticated & Authorised - No Roles Property', () => {
    let routeSpy = jasmine.createSpyObj('Route', ['toString'], {});
    let urlSegmentArraySpy = jasmine.createSpyObj('UrlSegment[]', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canLoad.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    routeSpy.data = {};
    let actualResponse: boolean | undefined
    (service.canLoad(routeSpy, urlSegmentArraySpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeTrue();
  })

  it('canLoad: Authenticated & Authorised - Empty Roles Array', () => {
    let routeSpy = jasmine.createSpyObj('Route', ['toString'], {});
    let urlSegmentArraySpy = jasmine.createSpyObj('UrlSegment[]', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canLoad.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    routeSpy.data = { role: [] };
    let actualResponse: boolean | undefined
    (service.canLoad(routeSpy, urlSegmentArraySpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeTrue();
  })

  it('canLoad: Authenticated & Authorised - Empty Roles String', () => {
    let routeSpy = jasmine.createSpyObj('Route', ['toString'], {});
    let urlSegmentArraySpy = jasmine.createSpyObj('UrlSegment[]', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canLoad.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    routeSpy.data = { role: '' };
    let actualResponse: boolean | undefined
    (service.canLoad(routeSpy, urlSegmentArraySpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeTrue();
  })

  it('canLoad: Authenticated & Authorised - Roles Match', () => {
    let routeSpy = jasmine.createSpyObj('Route', ['toString'], {});
    let urlSegmentArraySpy = jasmine.createSpyObj('UrlSegment[]', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canLoad.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    routeSpy.data = { role: ['ADMIN','USER'] } as Data;
    let actualResponse: boolean | undefined
    (service.canLoad(routeSpy, urlSegmentArraySpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeTrue();
  })

  it('canLoad: Not Authenticated', () => {
    let routeSpy = jasmine.createSpyObj('Route', ['toString'], {});
    let urlSegmentArraySpy = jasmine.createSpyObj('UrlSegment[]', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canLoad.and.returnValue(of(false));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    routeSpy.data = { role: ['ADMIN','USER'] } as Data;
    let actualResponse: boolean | undefined
    (service.canLoad(routeSpy, urlSegmentArraySpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeFalse();
  })

  it('canLoad: Not Authorised - Unmatched Role Array', () => {
    let routeSpy = jasmine.createSpyObj('Route', ['toString'], {});
    let urlSegmentArraySpy = jasmine.createSpyObj('UrlSegment[]', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canLoad.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    routeSpy.data = { role: ['UNKNOWN'] } as Data;
    let actualResponse: UrlTree | undefined
    (service.canLoad(routeSpy, urlSegmentArraySpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeInstanceOf(UrlTree);
  })

  it('canLoad: Not Authorised - Unmatched Role String', () => {
    let routeSpy = jasmine.createSpyObj('Route', ['toString'], {});
    let urlSegmentArraySpy = jasmine.createSpyObj('UrlSegment[]', ['toString'], {});
    let autoLoginAllRoutesGuardSpy = getAutoLoginAllRoutesGuard(service);
    let oidcSecurityServiceSpy = getOidcSecurityService(service);

    autoLoginAllRoutesGuardSpy.canLoad.and.returnValue(of(true));
    oidcSecurityServiceSpy.userData$ = of(({ userData: {roles: ['ADMIN','USER'] } } as UserDataResult));

    routeSpy.data = { role: 'UNKNOWN' } as Data;
    let actualResponse: UrlTree | undefined
    (service.canLoad(routeSpy, urlSegmentArraySpy) as Observable<any>)
        .subscribe((response) => actualResponse = response);
    expect(actualResponse).toBeInstanceOf(UrlTree);
  })
});

function getAutoLoginAllRoutesGuard(service: any) {
  return service.autoLoginAllRoutesGuard;
}

function getOidcSecurityService(service: any) {
  return service.oidcSecurityService;
}
