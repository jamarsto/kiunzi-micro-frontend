import { TestBed } from '@angular/core/testing';

import { SyncRouteShell } from './sync-route-shell.service';

describe('SyncRouteShell', () => {
  let service: SyncRouteShell;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
      ]
    });
    service = TestBed.inject(SyncRouteShell);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
