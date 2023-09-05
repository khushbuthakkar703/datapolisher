import { TestBed } from '@angular/core/testing';

import { NeonbillService } from './neonbill.service';

describe('NeonbillService', () => {
  let service: NeonbillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeonbillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
