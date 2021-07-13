import { TestBed } from '@angular/core/testing';

import { VirementServiceService } from './virement-service.service';

describe('VirementServiceService', () => {
  let service: VirementServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirementServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
