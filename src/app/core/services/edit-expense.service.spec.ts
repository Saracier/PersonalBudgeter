import { TestBed } from '@angular/core/testing';
import { EditExpenseService } from './edit-expense.service';
import { IExpense } from 'src/app/interfaces/iexpense';
import { Category } from 'src/app/enums/category';
import { v4 } from 'uuid';

describe('EditExpenseService', () => {
  let service: EditExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle modal display', () => {
    service.shouldModalBeDisplayed.next(true);
    expect(service.shouldModalBeDisplayed.getValue()).toBeTrue();

    service.shouldModalBeDisplayed.next(false);
    expect(service.shouldModalBeDisplayed.getValue()).toBeFalse();
  });

  it('should assign expense to edit', () => {
    const mockExpense: IExpense = {
      name: 'Filtry do wody DAFI',
      value: 24,
      date: new Date(2023, 1, 0),
      category: Category.Food,
      id: v4(),
    };

    service.expenseToEdit = mockExpense;
    expect(service.expenseToEdit).toEqual(mockExpense);
  });
});
