import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class ExpencesSettingsService {
  mockExpensesSettings = {
    Food: 400,
    House: 1100,
    Transport: 300,
    Telecomunication: 50,
    HealthCare: 50,
    Clothes: 250,
    Hygiene: 100,
    Kids: 300,
    Entertiment: 300,
    Debts: 400,
    Saving: 1500,
    Other: 400,
  };
  expensesSettings = new BehaviorSubject(this.mockExpensesSettings);
}
