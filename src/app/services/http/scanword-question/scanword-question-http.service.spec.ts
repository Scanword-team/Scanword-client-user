import { TestBed } from '@angular/core/testing';

import { ScanwordQuestionHttpService } from './scanword-question-http.service';

describe('ScanwordQuestionHttpService', () => {
  let service: ScanwordQuestionHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScanwordQuestionHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
