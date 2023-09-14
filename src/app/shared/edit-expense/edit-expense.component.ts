import { Component, EventEmitter, Output } from '@angular/core';
import { IExpense } from 'src/app/interfaces/iexpense';
import { Category } from 'src/app/enums/category';
import { EditExpenseService } from 'src/app/core/services/edit-expense.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpensesService } from 'src/app/core/services/expences.service';
import addDays from 'date-fns/addDays';
import { v4 } from 'uuid';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss'],
})
export class EditExpenseComponent {
  @Output() closeEvent = new EventEmitter<void>();
  currentExpense: IExpense;
  editForm: FormGroup;

  constructor(
    private EditExpenseService: EditExpenseService,
    private ExpensesService: ExpensesService
  ) {}

  ngOnInit() {
    if (this.EditExpenseService.expenseToEdit) {
      this.currentExpense = this.EditExpenseService.expenseToEdit;
    }
    const dateToEdit = this.EditExpenseService.expenseToEdit?.date!
      ? addDays(this.EditExpenseService.expenseToEdit?.date!, 1)
          .toISOString()
          .slice(0, -14)
      : null;
    this.editForm = new FormGroup({
      editName: new FormControl(
        this.EditExpenseService.expenseToEdit?.name ?? null,
        Validators.required
      ),
      value: new FormControl(
        this.EditExpenseService.expenseToEdit?.value ?? null,
        Validators.required
      ),
      date: new FormControl(dateToEdit ?? new Date(), Validators.required),
      category: new FormControl(
        Category[this.EditExpenseService.expenseToEdit?.category!] ??
          Category[11],
        Validators.required
      ),
    });
  }

  onSubmit() {
    const oldValues = this.ExpensesService.expenses.getValue();
    if (this.currentExpense) {
      let indexOfExpense = -1;
      for (const expence of this.ExpensesService.expenses.getValue()) {
        if (expence.id === this.currentExpense.id) {
          indexOfExpense = oldValues.indexOf(expence);
        }
      }
      if (indexOfExpense === -1) {
        console.error('Cannot find such expence to edit');
      }
      const editedValues = oldValues;
      editedValues[indexOfExpense].name = this.editForm.value.editName;
      editedValues[indexOfExpense].value = this.editForm.value.value;
      editedValues[indexOfExpense].date = new Date(this.editForm.value.date);
      editedValues[indexOfExpense].category = this.editForm.value.category;
      this.ExpensesService.expenses.next(editedValues);
    } else {
      const categoryValue: Category = this.editForm.value.category as Category;
      const newValue = {
        name: this.editForm.value.editName,
        value: this.editForm.value.value,
        date: new Date(this.editForm.value.date),
        category: Category[categoryValue] as unknown as Category,
        id: v4(),
      };
      this.ExpensesService.expenses.next([...oldValues, newValue]);
    }
    this.deleteComponent();
  }

  deleteComponent(event?: Event) {
    if (event && !(event?.target as HTMLElement).classList.contains('modal')) {
      return;
    }
    if (this.EditExpenseService.expenseToEdit) {
      this.currentExpense = this.EditExpenseService.expenseToEdit;
      this.EditExpenseService.expenseToEdit = null;
    }
    this.closeEvent.emit();
  }
}
