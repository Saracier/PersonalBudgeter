import { Component } from '@angular/core';
import { ExpensesService } from 'src/app/core/services/expences.service';
import { IExpenses } from 'src/app/interfaces/iexpenses';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  expenses: IExpenses[] = [
    { name: 'Czynsz', value: 1000, date: new Date(), category: 2 },
  ];
  expensesSubscripction = this.ExpensesService.expenses.subscribe(
    (expenses) => (this.expenses = expenses)
  );
  constructor(private ExpensesService: ExpensesService) {}

  ngOnInit() {
    console.log(this.expenses);
  }
}
