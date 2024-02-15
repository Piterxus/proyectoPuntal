import { TestBed } from '@angular/core/testing';

import { AuthngService } from './authng.service';

describe('AuthngService', () => {
  let service: AuthngService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthngService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
