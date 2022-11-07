import { TestBed } from '@angular/core/testing';

import { SolvableScanwordHttpService } from './solvable-scanword-http.service';

describe('SolvableScanwordHttpService', () => {
  let service: SolvableScanwordHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolvableScanwordHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
