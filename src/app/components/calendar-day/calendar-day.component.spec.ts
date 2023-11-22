import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarDayComponent } from './calendar-day.component';
import { By } from '@angular/platform-browser';
import { IExpense } from 'src/app/interfaces/iexpense';
import { Category } from 'src/app/enums/category';
import { v4 } from 'uuid';

describe('CalendarDayComponent', () => {
  let component: CalendarDayComponent;
  let fixture: ComponentFixture<CalendarDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarDayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDayComponent);
    component = fixture.componentInstance;
    component.displayedDays = 5;
    component.wantedMonth = 1;
    component.monthlyExpenses = [
      {
        name: 'Filtry do wody DAFI',
        value: 24,
        date: new Date(6, 1, 2023),
        category: Category.Food,
        id: v4(),
      } as IExpense,
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct day and month', () => {
    const title = fixture.debugElement.query(
      By.css('.single--name')
    ).nativeElement;
    expect(title.textContent).toContain('6 Luty');
  });
});
