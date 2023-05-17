import { TestBed } from '@angular/core/testing';

import { ArreteService } from './arrete.service';

describe('ArreteService', () => {
  let service: ArreteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArreteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
