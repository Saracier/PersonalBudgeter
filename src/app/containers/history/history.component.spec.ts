import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryComponent } from './history.component';
import { ExpensesService } from 'src/app/core/services/expences.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IExpense } from 'src/app/interfaces/iexpense';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let expensesServiceMock: Partial<ExpensesService>;
  let mockExpenses: IExpense[] = [];

  beforeEach(async () => {
    expensesServiceMock = {
      filterExpenses: () => of(mockExpenses),
    };

    await TestBed.configureTestingModule({
      declarations: [HistoryComponent],
      providers: [{ provide: ExpensesService, useValue: expensesServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of expenses', () => {
    fixture.detectChanges();
    const expenseElements =
      fixture.debugElement.nativeElement.querySelectorAll('.history__single');
    expect(expenseElements.length).toBe(mockExpenses.length);
  });

  it('should display a message if no expenses are present', () => {
    mockExpenses = [];
    fixture.detectChanges();
    const messageElement = fixture.debugElement.nativeElement.querySelector(
      '.history div:last-child'
    );
    expect(messageElement.textContent).toContain(
      'Żadne wydatki w tym okresie nie zostały wprowadzone'
    );
  });
});
