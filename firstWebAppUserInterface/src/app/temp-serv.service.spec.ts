import { TestBed } from '@angular/core/testing';

import { TempServService } from './temp-serv.service';

describe('TempServService', () => {
  let service: TempServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
