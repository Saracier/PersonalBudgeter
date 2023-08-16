import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IExpenses } from 'src/app/interfaces/iexpenses';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  mockExpenses: IExpenses[] = [
    { name: 'Czynsz', value: 1000, date: new Date(), category: 2 },
    { name: 'buty', value: 300, date: new Date(), category: 6 },
    { name: 'kredki', value: 20, date: new Date(), category: 7 },
    { name: 'paliwo', value: 120, date: new Date(), category: 3 },
    { name: 'kolajca z żoną', value: 100, date: new Date(), category: 2 },
  ];
  expenses = new BehaviorSubject(this.mockExpenses);
}
