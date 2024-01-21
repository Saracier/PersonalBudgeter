import { Component, Input } from '@angular/core';
import { IExpense } from 'src/app/interfaces/iexpense';
import { EditExpenseService } from 'src/app/core/services/edit-expense.service';

@Component({
  selector: 'app-calendar-single',
  templateUrl: './calendar-single.component.html',
  styleUrls: ['./calendar-single.component.scss'],
})
export class CalendarSingleComponent {
  @Input()
  singleExpense!: IExpense;

  constructor(private EditExpenseService: EditExpenseService) {}

  openEditModal() {
    this.EditExpenseService.expenseToEdit = this.singleExpense;
    this.EditExpenseService.shouldModalBeDisplayed$.next(true);
  }
}
