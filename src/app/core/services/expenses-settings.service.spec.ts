import { TestBed } from '@angular/core/testing';

import { ExpencesSettingsService } from './expenses-settings.service';

describe('ExpencesSettingsService', () => {
  let service: ExpencesSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpencesSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
