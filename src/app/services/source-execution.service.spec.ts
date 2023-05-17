import { TestBed } from '@angular/core/testing';

import { SourceExecutionService } from './source-execution.service';

describe('SourceExecutionService', () => {
  let service: SourceExecutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourceExecutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
