import { TestBed } from '@angular/core/testing';

import { CommunityPortalService } from './community-portal.service';

describe('CommunityPortalService', () => {
  let service: CommunityPortalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityPortalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
