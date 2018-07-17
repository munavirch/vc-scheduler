import { TestBed, inject } from '@angular/core/testing';

import { ButtonOnRequestService } from './button-on-request.service';

describe('ButtonOnRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ButtonOnRequestService]
    });
  });

  it('should be created', inject([ButtonOnRequestService], (service: ButtonOnRequestService) => {
    expect(service).toBeTruthy();
  }));
});
