import { Component } from '@angular/core';
import { ExpensesService } from 'src/app/core/services/expences.service';
import { IExpense } from 'src/app/interfaces/iexpense';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  expenses$: Observable<IExpense[]> =
    this.ExpensesService.filterExpenses$().pipe(
      tap((expenses) => {
        if (expenses.length === 0) return;
        this.wantedMonth = expenses[0].date.getMonth();
        this.wantedYear = expenses[0].date.getFullYear();
      })
    );
  wantedMonth: number = new Date().getMonth();
  wantedYear: number = new Date().getFullYear();

  constructor(private ExpensesService: ExpensesService) {}
}
