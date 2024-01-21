import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ISettingsExpences } from 'src/app/interfaces/isettings-expences';

@Injectable({
  providedIn: 'root',
})
export class ExpencesSettingsService {
  mockExpensesSettings: ISettingsExpences = {
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
  expensesSettings$ = new BehaviorSubject(this.mockExpensesSettings);
}
