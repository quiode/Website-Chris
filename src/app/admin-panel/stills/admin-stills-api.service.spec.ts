import { TestBed } from '@angular/core/testing';

import { AdminStillsApiService } from './admin-stills-api.service';

describe('AdminStillsApiService', () => {
  let service: AdminStillsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminStillsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
