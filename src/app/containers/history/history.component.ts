import { Component } from '@angular/core';
import { ExpensesService } from 'src/app/core/services/expences.service';
import { IExpense } from 'src/app/interfaces/iexpense';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  expenses: IExpense[] = [];
  expensesSubscripction = this.ExpensesService.expenses.subscribe(
    (expenses) => (this.expenses = expenses)
  );
  constructor(private ExpensesService: ExpensesService) {}

  ngOnDestroy() {
    this.expensesSubscripction.unsubscribe();
  }
}
