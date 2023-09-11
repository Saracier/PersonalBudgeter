import { Component, EventEmitter, Output } from '@angular/core';
import { IExpense } from 'src/app/interfaces/iexpense';
import { EditExpenseService } from 'src/app/core/services/edit-expense.service';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss'],
})
export class EditExpenseComponent {
  @Output() closeEvent = new EventEmitter<void>();
  currentExpense: IExpense;

  constructor(private EditExpenseService: EditExpenseService) {}

  ngOnInit() {
    if (this.EditExpenseService.expenseToEdit) {
      this.currentExpense = this.EditExpenseService.expenseToEdit;
    }
  }

  deleteComponent() {
    this.closeEvent.emit();
  }
}
