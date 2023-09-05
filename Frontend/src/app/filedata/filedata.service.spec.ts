import { TestBed } from '@angular/core/testing';

import { FiledataService } from './filedata.service';

describe('FiledataService', () => {
  let service: FiledataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiledataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
