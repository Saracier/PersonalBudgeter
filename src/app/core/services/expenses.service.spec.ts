import { TestBed } from '@angular/core/testing';

import { ExpensesService } from './expences.service';

describe('ExpencesService', () => {
  let service: ExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
