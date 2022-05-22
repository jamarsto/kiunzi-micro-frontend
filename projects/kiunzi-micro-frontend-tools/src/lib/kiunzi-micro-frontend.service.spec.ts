import { TestBed } from '@angular/core/testing';

import { KiunziMicroFrontendService } from './kiunzi-micro-frontend.service';

describe('KiunziMicroFrontendService', () => {
  let service: KiunziMicroFrontendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KiunziMicroFrontendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
