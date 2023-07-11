import { TestBed } from '@angular/core/testing';

import { ServizService } from './serviz.service';

describe('ServizService', () => {
  let service: ServizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
