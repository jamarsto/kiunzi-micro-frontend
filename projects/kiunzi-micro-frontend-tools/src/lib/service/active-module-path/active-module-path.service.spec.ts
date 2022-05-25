import { TestBed } from '@angular/core/testing';

import { ActiveModulePath } from './active-module-path.service';

describe('ActiveModulePath', () => {
  let service: ActiveModulePath;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
      ]
    });
    service = TestBed.inject(ActiveModulePath);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
