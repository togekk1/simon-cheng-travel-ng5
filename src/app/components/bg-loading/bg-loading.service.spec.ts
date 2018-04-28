import { TestBed, inject } from '@angular/core/testing';

import { BgLoadingService } from './bg-loading.service';

describe('BgLoadingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BgLoadingService]
    });
  });

  it('should be created', inject([BgLoadingService], (service: BgLoadingService) => {
    expect(service).toBeTruthy();
  }));
});
