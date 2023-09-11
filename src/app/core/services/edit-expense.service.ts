import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IExpense } from 'src/app/interfaces/iexpense';

@Injectable({
  providedIn: 'root',
})
export class EditExpenseService {
  shouldModalBeDisplayed = new BehaviorSubject(false);
  expenseToEdit: IExpense | null = null;
  constructor() {}
}
