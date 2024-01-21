import { Component, Input } from '@angular/core';
import { IExpense } from '../../interfaces/iexpense';
import { EditExpenseService } from 'src/app/core/services/edit-expense.service';

@Component({
  selector: 'app-history-single',
  templateUrl: './history-single.component.html',
  styleUrls: ['./history-single.component.scss'],
})
export class HistorySingleComponent {
  @Input()
  singleExpense!: IExpense;

  constructor(private EditExpenseService: EditExpenseService) {}

  openEditModal() {
    this.EditExpenseService.expenseToEdit = this.singleExpense;
    this.EditExpenseService.shouldModalBeDisplayed$.next(true);
  }
}
