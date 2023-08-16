import { Component } from '@angular/core';
import { ExpensesService } from 'src/app/core/services/expences.service';
import { IExpense } from 'src/app/interfaces/iexpense';
import { HeaderService } from 'src/app/core/services/header.service';

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
  constructor(
    private ExpensesService: ExpensesService,
    private HeaderService: HeaderService
  ) {}

  ngOnInit() {
    this.HeaderService.setHeaderText('Historia');
  }

  ngOnDestroy() {
    this.expensesSubscripction.unsubscribe();
  }
}
