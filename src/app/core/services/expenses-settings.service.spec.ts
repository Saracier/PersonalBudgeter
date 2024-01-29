import { TestBed } from '@angular/core/testing';
import { CurrentDateService } from './current-date.service';
import { ExpensesSettingsService } from './expenses-settings.service';
import { BehaviorSubject } from 'rxjs';
import { ExpensesService } from './expenses.service';

describe('ExpensesService', () => {
  let service: ExpensesService;
  let currentDateServiceMock: Partial<CurrentDateService>;
  let expensesSettingsServiceMock: Partial<ExpensesSettingsService>;

  beforeEach(() => {
    currentDateServiceMock = {
      shownDate$: new BehaviorSubject(new Date(2023, 11)),
    };
    expensesSettingsServiceMock = {
      mockExpensesSettings: {
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
      },
    };

    TestBed.configureTestingModule({
      providers: [
        ExpensesService,
        { provide: CurrentDateService, useValue: currentDateServiceMock },
        {
          provide: ExpensesSettingsService,
          useValue: expensesSettingsServiceMock,
        },
      ],
    });
    service = TestBed.inject(ExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate mock expenses', () => {
    service.prepareMockExpenses();
    expect(service.expenses$.getValue().length).toBeGreaterThan(0);
  });
});
