import { TestBed } from '@angular/core/testing';

import { EtatReclamationService } from './etat-reclamation.service';

describe('EtatReclamationService', () => {
  let service: EtatReclamationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtatReclamationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
