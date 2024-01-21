/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarSingleComponent } from './calendar-single.component';
import { By } from '@angular/platform-browser';
import { IExpense } from 'src/app/interfaces/iexpense';
import { Category } from 'src/app/enums/category';
import { v4 } from 'uuid';
import { EditExpenseService } from 'src/app/core/services/edit-expense.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

describe('CalendarSingleComponent', () => {
  let component: CalendarSingleComponent;
  let fixture: ComponentFixture<CalendarSingleComponent>;
  let editExpenseServiceMock: Partial<EditExpenseService>;

  beforeEach(async () => {
    editExpenseServiceMock = {
      expenseToEdit: null,
      shouldModalBeDisplayed$: new BehaviorSubject<boolean>(false),
    };

    spyOn(
      editExpenseServiceMock.shouldModalBeDisplayed$!,
      'next'
    ).and.callThrough();

    await TestBed.configureTestingModule({
      declarations: [CalendarSingleComponent],
      providers: [
        { provide: EditExpenseService, useValue: editExpenseServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarSingleComponent);
    component = fixture.componentInstance;
    (component.singleExpense = {
      name: 'Filtry do wody DAFI',
      value: 24,
      date: new Date(6, 1, 2023),
      category: Category.Food,
      id: v4(),
    } as IExpense),
      fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display expense info correctly', () => {
    const expenseInfo = fixture.debugElement.query(
      By.css('.expense--info')
    ).nativeElement;
    expect(expenseInfo.textContent).toContain('Filtry do wody DAFI');
    expect(expenseInfo.textContent).toContain('24');
  });

  it('should call EditExpenseService when edit button is clicked', () => {
    const editButton = fixture.debugElement.query(
      By.css('.expense__edit')
    ).nativeElement;
    editButton.click();
    expect(
      editExpenseServiceMock.shouldModalBeDisplayed$?.next
    ).toHaveBeenCalledWith(true);
    expect(editExpenseServiceMock.expenseToEdit).toBe(component.singleExpense);
  });
});
