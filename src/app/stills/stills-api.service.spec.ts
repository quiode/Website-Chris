import { TestBed } from '@angular/core/testing';

import { StillsApiService } from './stills-api.service';

describe('StillsApiService', () => {
  let service: StillsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StillsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
