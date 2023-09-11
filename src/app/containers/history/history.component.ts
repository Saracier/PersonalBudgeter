import { Component } from '@angular/core';
import { ExpensesService } from 'src/app/core/services/expences.service';
import { CurrentDateService } from 'src/app/core/services/current-date.service';
import { IExpense } from 'src/app/interfaces/iexpense';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  expenses: IExpense[] = [];
  wantedMonth: number = new Date().getMonth();
  wantedYear: number = new Date().getFullYear();
  expensesSubscripction = this.ExpensesService.expenses.subscribe(
    (expenses) => (this.expenses = expenses)
  );
  currentDateSubscripction = this.CurrentDateService.shownDate.subscribe(
    (dateFromSubscripcion) => {
      this.wantedMonth = dateFromSubscripcion.getMonth();
      this.wantedYear = dateFromSubscripcion.getFullYear();
    }
  );
  constructor(
    private ExpensesService: ExpensesService,
    private CurrentDateService: CurrentDateService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.expensesSubscripction.unsubscribe();
    this.currentDateSubscripction.unsubscribe();
  }
}
