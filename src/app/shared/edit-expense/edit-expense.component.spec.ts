import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditExpenseComponent } from './edit-expense.component';
import { EditExpenseService } from 'src/app/core/services/edit-expense.service';
import { ExpensesService } from 'src/app/core/services/expenses.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IExpense } from 'src/app/interfaces/iexpense';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Category } from 'src/app/enums/category';
import { v4 } from 'uuid';

describe('EditExpenseComponent', () => {
  let component: EditExpenseComponent;
  let fixture: ComponentFixture<EditExpenseComponent>;
  let editExpenseServiceMock: Partial<EditExpenseService>;
  let expensesServiceMock: Partial<ExpensesService>;

  beforeEach(async () => {
    editExpenseServiceMock = {
      expenseToEdit: {
        name: 'Filtry do wody DAFI',
        value: 24,
        date: new Date(2023, 1, 6),
        category: Category.Food,
        id: v4(),
      },
    };
    expensesServiceMock = {
      expenses$: new BehaviorSubject<IExpense[]>([]),
    };

    await TestBed.configureTestingModule({
      declarations: [EditExpenseComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: EditExpenseService, useValue: editExpenseServiceMock },
        { provide: ExpensesService, useValue: expensesServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
