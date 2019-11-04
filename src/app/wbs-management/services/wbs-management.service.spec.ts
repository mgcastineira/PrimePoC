import { TestBed } from '@angular/core/testing';

import { WBSManagementService } from './wbs-management.service';

describe('WBSManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WBSManagementService = TestBed.get(WBSManagementService);
    expect(service).toBeTruthy();
  });
});
