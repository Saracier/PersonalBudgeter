import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditExpenseDirective } from '../../shared/directives/edit-expense.directive';

@NgModule({
  declarations: [EditExpenseDirective],
  imports: [CommonModule],
  exports: [EditExpenseDirective],
})
export class SharedDirectivesModule {}
