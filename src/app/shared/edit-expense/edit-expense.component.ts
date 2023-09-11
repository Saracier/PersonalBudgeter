import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss'],
})
export class EditExpenseComponent {
  @Output() closeEvent = new EventEmitter<void>();

  deleteComponent() {
    this.closeEvent.emit();
  }
}