import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarPaginationComponent } from './calendar-pagination.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IExpense } from 'src/app/interfaces/iexpense';
import { CurrentDateService } from 'src/app/core/services/current-date.service';
import { Category } from 'src/app/enums/category';
import { v4 } from 'uuid';

describe('CalendarPaginationComponent', () => {
  let component: CalendarPaginationComponent;
  let fixture: ComponentFixture<CalendarPaginationComponent>;
  let currentDateServiceMock: Partial<CurrentDateService>;

  beforeEach(async () => {
    currentDateServiceMock = {
      goToTodayCalendar$: jasmine.createSpyObj('goToTodayCalendar', [
        'subscribe',
      ]),
    };
    currentDateServiceMock?.goToTodayCalendar$?.subscribe(() => {
      console.log('goToTodayCalendar');
    });
    await TestBed.configureTestingModule({
      declarations: [CalendarPaginationComponent],
      imports: [MatPaginatorModule],
      providers: [
        { provide: CurrentDateService, useValue: currentDateServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarPaginationComponent);
    component = fixture.componentInstance;
    component.monthlyExpenses = [
      {
        name: 'Filtry do wody DAFI',
        value: 24,
        date: new Date(2023, 1, 0),
        category: Category.Food,
        id: v4(),
      } as IExpense,
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit updatePagination event on handlePaginationEvent', () => {
    spyOn(component.updatePagination, 'emit');
  });

  it('should emit updatePagination event on handlePaginationEvent', () => {
    spyOn(component.updatePagination, 'emit');
    const pageEvent: PageEvent = {
      length: 28,
      pageIndex: 1,
      pageSize: 3,
      previousPageIndex: 0,
    };
    component.handlePaginationEvent(pageEvent);
    expect(component.updatePagination.emit).toHaveBeenCalled();
  });

  it('should update days in month', () => {
    component.updateDaysInMonth();
    expect(component.daysInMonth).toBe(new Date(2023, 1, 0).getDate());
  });

  it('should emit updatePagination event on handlePaginationEvent', () => {
    spyOn(component.updatePagination, 'emit');
    const pageEvent: PageEvent = {
      length: 28,
      pageIndex: 1,
      pageSize: 3,
      previousPageIndex: 0,
    };
    component.handlePaginationEvent(pageEvent);
    expect(component.updatePagination.emit).toHaveBeenCalled();
  });
});
