import { TestBed } from '@angular/core/testing';
import { ISettingsExpences } from 'src/app/interfaces/isettings-expences';
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

  it('should have initial expense settings', () => {
    const initialSettings: ISettingsExpences = {
      Food: 400,
      House: 1100,
      Transport: 300,
      Telecomunication: 100,
      HealthCare: 100,
      Clothes: 250,
      Hygiene: 100,
      Kids: 300,
      Entertiment: 300,
      Debts: 400,
      Saving: 1500,
      Other: 400,
    };
    expect(service.expensesSettings.getValue()).toEqual(initialSettings);
  });

  it('should update expense settings', () => {
    const newSettings: ISettingsExpences = {
      Food: 500,
      House: 1200,
      Transport: 200,
      Telecomunication: 10,
      HealthCare: 20,
      Clothes: 550,
      Hygiene: 150,
      Kids: 320,
      Entertiment: 330,
      Debts: 420,
      Saving: 100,
      Other: 200,
    };
    service.expensesSettings.next(newSettings);
    expect(service.expensesSettings.getValue()).toEqual(newSettings);
  });
});
