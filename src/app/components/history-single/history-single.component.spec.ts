import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorySingleComponent } from './history-single.component';
import { EditExpenseService } from 'src/app/core/services/edit-expense.service';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Category } from 'src/app/enums/category';
import { v4 } from 'uuid';

describe('HistorySingleComponent', () => {
  let component: HistorySingleComponent;
  let fixture: ComponentFixture<HistorySingleComponent>;
  let editExpenseServiceMock: Partial<EditExpenseService>;

  beforeEach(async () => {
    editExpenseServiceMock = {
      expenseToEdit: null,
      shouldModalBeDisplayed: new BehaviorSubject<boolean>(false),
    };

    spyOn(
      editExpenseServiceMock.shouldModalBeDisplayed!,
      'next'
    ).and.callThrough();

    await TestBed.configureTestingModule({
      declarations: [HistorySingleComponent],
      providers: [
        { provide: EditExpenseService, useValue: editExpenseServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorySingleComponent);
    component = fixture.componentInstance;
    component.singleExpense = {
      name: 'Filtry do wody DAFI',
      value: 24,
      date: new Date(2023, 1, 6),
      category: Category.Food,
      id: v4(),
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display expense name, value, and date correctly', () => {
    const nameEl = fixture.debugElement.query(
      By.css('.expense__entry--name')
    ).nativeElement;
    expect(nameEl.textContent).toContain('Filtry do wody DAFI');

    const valueEl = fixture.debugElement.query(
      By.css('.expense__entry--currency')
    ).nativeElement;
    expect(valueEl.textContent).toContain('24');

    const dateEl = fixture.debugElement.query(
      By.css('.expense__input .expense__entry:last-child')
    ).nativeElement;
    expect(dateEl.textContent).toContain('06/02/23');
  });

  it('should call EditExpenseService when edit button is clicked', () => {
    const editButton = fixture.debugElement.query(
      By.css('.expense__edit')
    ).nativeElement;
    editButton.click();
    expect(
      editExpenseServiceMock?.shouldModalBeDisplayed?.next
    ).toHaveBeenCalledWith(true);
    expect(editExpenseServiceMock.expenseToEdit).toEqual(
      component.singleExpense
    );
  });
});
