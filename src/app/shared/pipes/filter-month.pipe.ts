import { Pipe, PipeTransform } from '@angular/core';
import { IExpense } from '../../interfaces/iexpense';
import { months } from '../../enums/months';

@Pipe({
  name: 'filterMonth',
})
export class FilterMonthPipe implements PipeTransform {
  transform(expenseArray: IExpense[], month: months, year: number): IExpense[] {
    if (expenseArray.length === 0) return expenseArray;
    const resultArray: IExpense[] = [];
    for (const expense of expenseArray) {
      if (expense.date.getFullYear() !== year) continue;
      if (expense.date.getMonth() === month) {
        resultArray.push(expense);
      }
    }
    return resultArray;
  }
}
