import { TestBed } from '@angular/core/testing';

import { PhotoViewerService } from './photo-viewer.service';

describe('PhotoViewerService', () => {
  let service: PhotoViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
