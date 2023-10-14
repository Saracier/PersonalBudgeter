import { Component, OnDestroy } from '@angular/core';
import { ExpensesService } from 'src/app/core/services/expences.service';
import { IExpense } from 'src/app/interfaces/iexpense';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnDestroy {
  wantedMonth: number = new Date().getMonth();
  wantedYear: number = new Date().getFullYear();
  monthlyExpenses: IExpense[] = [];
  daysInMonth: number;
  displayedDays: number;
  expensesSubscripction = this.ExpensesService.filterExpenses().subscribe(
    (expenses) => {
      if (expenses.length === 0) {
        this.monthlyExpenses = [];
        return;
      }
      this.monthlyExpenses = expenses;
      this.wantedMonth = expenses[0].date.getMonth();
      this.wantedYear = expenses[0].date.getFullYear();
    }
  );

  constructor(private ExpensesService: ExpensesService) {}

  updatePagination(paginationData: {
    monthlyExpenses: IExpense[];
    daysInMonth: number;
    displayedDays: number;
  }) {
    this.monthlyExpenses = paginationData.monthlyExpenses;
    this.daysInMonth = paginationData.daysInMonth;
    this.displayedDays = paginationData.displayedDays;
  }
  ngOnDestroy() {
    this.expensesSubscripction.unsubscribe();
  }
}
