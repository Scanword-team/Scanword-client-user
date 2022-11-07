import { TestBed } from '@angular/core/testing';

import { ScanwordHttpService } from './scanword-http.service';

describe('ScanwordHttpService', () => {
  let service: ScanwordHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScanwordHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
