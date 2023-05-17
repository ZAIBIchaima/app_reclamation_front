import { TestBed } from '@angular/core/testing';

import { TypeDecisionService } from './type-decision.service';

describe('TypeDecisionService', () => {
  let service: TypeDecisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeDecisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
