import { TestBed } from '@angular/core/testing';

import { AdminVideosApiService } from './admin-videos-api.service';

describe('AdminVideosApiService', () => {
  let service: AdminVideosApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminVideosApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
