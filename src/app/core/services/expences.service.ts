import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { IExpense } from 'src/app/interfaces/iexpense';
import { v4 } from 'uuid';
import { CurrentDateService } from './current-date.service';
import { ExpensesSettingsService } from './expences-settings.service';
import subMonths from 'date-fns/subMonths';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import { mockExpenses, mockExpensesSource } from '../../../assets/mockExpences';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  mockExpenses = mockExpenses;
  mockExpensesSource = mockExpensesSource;
  expenses$ = new BehaviorSubject(this.mockExpenses);

  constructor(
    private currentDateService: CurrentDateService,
    private ExpensesSettingsService: ExpensesSettingsService
  ) {
    this.prepareMockExpenses();
  }

  generateRandomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  prepareSingleCategory(
    valueOfCategory: number,
    indexCategory: number,
    date: Date
  ) {
    let expensesSingleCategory: IExpense[] = [];
    let valueOfCategoryCopy = valueOfCategory;
    while (valueOfCategoryCopy >= 0) {
      const expenseForThisIteration = Object.assign(
        {},
        this.mockExpensesSource[indexCategory][
          Math.floor(
            Math.random() * this.mockExpensesSource[indexCategory].length
          )
        ]
      );
      const dayExpense = this.generateRandomNumber(1, getDaysInMonth(date));
      const newDateExpense = new Date(
        date.getFullYear(),
        date.getMonth(),
        dayExpense
      );

      expenseForThisIteration.date = newDateExpense;
      expenseForThisIteration.id = v4();

      valueOfCategoryCopy = valueOfCategoryCopy - expenseForThisIteration.value;

      if (valueOfCategoryCopy < 0) continue;

      expensesSingleCategory.push(expenseForThisIteration);
    }

    if (date.getMonth() === new Date().getMonth()) {
      expensesSingleCategory = expensesSingleCategory.filter(
        (signleExpense) => {
          if (signleExpense.date.getDate() > new Date().getDate()) {
            return false;
          }
          return true;
        }
      );
    }

    return expensesSingleCategory;
  }

  prepareMockExpenses() {
    const resultArray: IExpense[] = [];
    const settingsValues: number[] = Object.values(
      this.ExpensesSettingsService.mockExpensesSettings
    );
    for (let i = 0; i < 3; i++) {
      let monthForThisIteration = new Date().getMonth();
      if (i > 0) {
        monthForThisIteration = subMonths(new Date(), i).getMonth();
      }
      const yearForThisIteration = subMonths(new Date(), i).getFullYear();
      const dateForThisIteration = new Date(
        yearForThisIteration,
        monthForThisIteration,
        1
      );
      settingsValues.forEach((element, index) => {
        resultArray.push(
          ...this.prepareSingleCategory(element, index, dateForThisIteration)
        );
      });
    }
    this.expenses$.next(resultArray);
  }

  filterExpenses$() {
    return combineLatest([
      this.expenses$.asObservable(),
      this.currentDateService.shownDate$.asObservable(),
    ]).pipe(
      map(([expenses, currentDate]) => {
        return expenses.filter((expense) => {
          return (
            expense.date.getFullYear() === currentDate.getFullYear() &&
            expense.date.getMonth() === currentDate.getMonth()
          );
        });
      })
    );
  }
}
