import { TestBed } from '@angular/core/testing';

import { EtatInfracionService } from './etat-infracion.service';

describe('EtatInfracionService', () => {
  let service: EtatInfracionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtatInfracionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
