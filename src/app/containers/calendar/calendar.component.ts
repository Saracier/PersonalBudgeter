import { Component, OnDestroy } from '@angular/core';
import { ExpensesService } from 'src/app/core/services/expences.service';
import { CurrentDateService } from 'src/app/core/services/current-date.service';
import { IExpense } from 'src/app/interfaces/iexpense';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnDestroy {
  expenses: IExpense[] = [];
  wantedMonth: number = new Date().getMonth();
  wantedYear: number = new Date().getFullYear();
  monthlyExpenses!: IExpense[];
  daysInMonth: number;
  displayedDays: number;
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

  updatePagination(paginationData: {
    monthlyExpenses: IExpense[];
    daysInMonth: number;
    displayedDays: number;
  }) {
    console.log('paginationData w calendar', paginationData);
    this.monthlyExpenses = paginationData.monthlyExpenses;
    this.daysInMonth = paginationData.daysInMonth;
    this.displayedDays = paginationData.displayedDays;
  }

  ngOnDestroy() {
    this.expensesSubscripction.unsubscribe();
    this.currentDateSubscripction.unsubscribe();
  }
}
