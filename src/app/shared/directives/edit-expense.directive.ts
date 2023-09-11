import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appEditExpense]',
})
export class EditExpenseDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
