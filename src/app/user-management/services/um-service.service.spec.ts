import { TestBed } from '@angular/core/testing';

import { UmServiceService } from '@um/services/um-service.service';

describe('UmServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UmServiceService = TestBed.get(UmServiceService);
    expect(service).toBeTruthy();
  });
});
