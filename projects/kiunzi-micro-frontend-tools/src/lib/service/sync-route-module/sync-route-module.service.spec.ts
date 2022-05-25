import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AutoLoginPartialRoutesGuard, OidcSecurityService, UserDataResult } from 'angular-auth-oidc-client';
import { of } from 'rxjs';

import { SyncRouteModule } from './sync-route-module.service';

describe('SyncRouteShell', () => {
  let service: SyncRouteModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
      ]
    });
    service = TestBed.inject(SyncRouteModule);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
