import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarComponent } from './calendar.component';
import { ExpensesService } from 'src/app/core/services/expences.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { IExpense } from 'src/app/interfaces/iexpense';
import { Category } from 'src/app/enums/category';
import { v4 } from 'uuid';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let expensesServiceMock: Partial<ExpensesService>;
  const mockExpenses: IExpense[] = [
    {
      name: 'Filtry do wody DAFI',
      value: 24,
      date: new Date(6, 1, 2023),
      category: Category.Food,
      id: v4(),
    },
  ];

  beforeEach(async () => {
    expensesServiceMock = {
      filterExpenses$: () => of(mockExpenses),
    };

    await TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [{ provide: ExpensesService, useValue: expensesServiceMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with expenses from ExpensesService', () => {
    expect(component.monthlyExpenses).toEqual(mockExpenses);
  });

  it('should display error message when no expenses are available', () => {
    component.monthlyExpenses = [];
    fixture.detectChanges();
    const errorMsg =
      fixture.debugElement.nativeElement.querySelector('.calendar--error');
    expect(errorMsg).toBeTruthy();
    expect(errorMsg.textContent).toContain(
      'Żadne wydatki w tym okresie nie zostały wprowadzone'
    );
  });

  it('should update component state correctly when updatePagination is called', () => {
    const paginationData = {
      monthlyExpenses: mockExpenses,
      daysInMonth: 30,
      displayedDays: 5,
    };
    component.updatePagination(paginationData);
    expect(component.monthlyExpenses).toEqual(mockExpenses);
    expect(component.daysInMonth).toBe(30);
    expect(component.displayedDays).toBe(5);
  });

  it('should unsubscribe from expensesSubscripction$ on ngOnDestroy', () => {
    spyOn(component.expensesSubscripction$, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.expensesSubscripction$.unsubscribe).toHaveBeenCalled();
  });
});
